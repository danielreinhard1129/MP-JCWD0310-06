import { NEXT_BASE_URL } from '@/config';
import { transporter } from '@/libs/nodemailer';
import prisma from '@/prisma';
import { appConfig } from '@/utils/config';
import { Transaction } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { scheduleJob } from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';

interface CreateTransactionBody
  extends Omit<Transaction, 'createdAt' | 'updatedAt' | 'id'> {}

export const createTransactionService = async (body: CreateTransactionBody) => {
  try {
    const {
      eventId,
      userId,
      qty,
      isPointUse,
      isUseCoupon,
      userCouponId,
      isUseVoucher,
      userVoucherId,
    } = body;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('user not found');
    }

    const userEmail = user.email;

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '30m',
    });

    
    const event = await prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    if (!event) {
      throw new Error('event not found');
    }

    const invoice = uuidv4();

    const totalPrice = event.price * qty;

    let point = null;

    if (String(isPointUse) === 'true') {
      point = await prisma.user.findFirst({
        where: { id: Number(userId) },
      });

      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: 0,
        },
      });
    }

    let coupon = null;

    if (String(isUseCoupon) === 'true') {
      coupon = await prisma.userCoupon.findFirst({
        where: { id: Number(userCouponId) },
        include: { coupon: true },
      });

      await prisma.userCoupon.update({
        where: { id: Number(userCouponId) },
        data: {
          isUse: true,
        },
      });
    }

    const couponAmount: number = coupon?.coupon.discountAmount || 0;

    let voucher = null;

    if (String(isUseVoucher) === 'true') {
      voucher = await prisma.userVoucher.findFirst({
        where: { id: Number(userVoucherId) },
        include: { voucher: true },
      });

      await prisma.userVoucher.update({
        where: { id: Number(userCouponId) },
        data: {
          isUse: true,
        },
      });
    }

    const voucherAmount: number = voucher?.voucher.discountAmount || 0;

    const totalDiscount =
      totalPrice - Number(couponAmount) - Number(voucherAmount);

    const total = totalDiscount - user.point;

    const newTransaction = await prisma.transaction.create({
      data: {
        ...body,
        paymentProof: `/txProof/`,
        invoice,
        total,
        userId: Number(userId),
        eventId: Number(eventId),
        qty: Number(qty),
        isPointUse: Boolean(isPointUse),
        isUseCoupon: Boolean(isUseCoupon),
        isUseVoucher: Boolean(isUseVoucher),
      },
      include: {
        event: true,
        user: true,
      },
    });

    if (user.point - totalDiscount >= 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: user.point - totalDiscount,
        },
      });
    } else if (user.point - totalDiscount < 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: 0,
        },
      });
    }
    const confirmationLink = NEXT_BASE_URL + `/confirmation?token=${token}&id=${newTransaction.id}`;
    if (newTransaction.total === 0) {
      await prisma.transaction.update({
        where: { id: newTransaction.id },
        data: { status: 'COMPLETE' },
      });
      await prisma.event.update({
        where: { id: Number(eventId) },
        data: { limit: event.limit - 1 },
      });
      await transporter.sendMail({
        from: 'Admin',
        to: userEmail,
        subject: 'Thanks for ordering',
        html: `<p>Thanks brok!</p>`,
      });
    } else {
      await transporter.sendMail({
        from: 'Admin',
        to: userEmail,
        subject: 'Confirm your order',
        html: `<a href="${confirmationLink}" target="_blank">Upload payment proof</a>`,
      });
    }

    const schedule = new Date(Date.now() + 2 * 60 * 60 * 1000);
    scheduleJob('run every ', schedule, async () => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: newTransaction.id,
          status: 'PENDING',
        },
      });
      if (transaction) {
        await prisma.transaction.update({
          where: { id: newTransaction.id },
          data: { status: 'EXPIRED' },
        });
        await prisma.user.update({
          where: { id: newTransaction.userId },
          data: { point: user.point },
        });
        if (isUseVoucher) {
          await prisma.userVoucher.update({
            where: { id: Number(userVoucherId) },
            data: {
              isUse: false,
            },
          });
        }
        if (isUseCoupon) {
          await prisma.userCoupon.update({
            where: { id: Number(userCouponId) },
            data: {
              isUse: false,
            },
          });
        }
        await transporter.sendMail({
          from: 'Admin',
          to: userEmail,
          subject: 'Order expired',
          html: `<p>Your order with invoice ${invoice} has been expired.</p>`,
        });
      }

      console.log('Order Expired');

      return {
        message: `Order expired. Email has been sent to ${userEmail}`,
      };
    });

    const scheduleAdmin = new Date(Date.now() + 24 * 60 * 60 * 1000);
    scheduleJob('run every ', scheduleAdmin, async () => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: newTransaction.id,
          status: 'WAITING',
        },
      });
      if (transaction) {
        await prisma.transaction.update({
          where: { id: newTransaction.id },
          data: { status: 'CANCELLED' },
        });
        await prisma.user.update({
          where: { id: newTransaction.userId },
          data: { point: user.point },
        });
        if (isUseVoucher) {
          await prisma.userVoucher.update({
            where: { id: Number(userVoucherId) },
            data: {
              isUse: false,
            },
          });
        }
        if (isUseCoupon) {
          await prisma.userCoupon.update({
            where: { id: Number(userCouponId) },
            data: {
              isUse: false,
            },
          });
        }
        await transporter.sendMail({
          from: 'Admin',
          to: userEmail,
          subject: 'Order cancelled',
          html: `<p>Your order with invoice ${invoice} has been cancelled</p>`,
        });
      }

      console.log('Order Cancelled');

      return {
        message: `Order cancelled. Email has been sent to ${userEmail}`,
      };
    });

    return {
      message: `Transaction created`,
    };
  } catch (error) {
    throw error;
  }
};
