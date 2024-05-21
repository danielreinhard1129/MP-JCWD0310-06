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

    const event = await prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    if (!event) {
      throw new Error('event not found');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '30m',
    });

    const baseLimit = event.limit;

    const invoice = uuidv4();

    const baseUserPoint = user.point;

    let point = null;

    let total = event.price * qty;

    const totalPriceWithoutDiscount = event.price * qty;

    let totalDiscountCouponVoucher = 0;

    if (String(isPointUse) === 'true') {
      point = user.point;

      total -= point;

      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: 0,
        },
      });
    }

    if (String(isUseCoupon) === 'true') {
      const userCoupon = await prisma.userCoupon.findFirst({
        where: { userId: Number(userId), isUse: false },
        include: { coupon: true },
      });

      total -= Number(userCoupon?.coupon.discountAmount);
      totalDiscountCouponVoucher += Number(userCoupon?.coupon.discountAmount);

      await prisma.userCoupon.update({
        where: { id: Number(userCoupon?.id) },
        data: {
          isUse: true,
        },
      });
    }

    if (String(isUseVoucher) === 'true') {
      const userVoucher = await prisma.userVoucher.findFirst({
        where: { userId: Number(userId), isUse: false },
        include: { voucher: true },
      });

      total -= Number(userVoucher?.voucher.discountAmount);
      totalDiscountCouponVoucher += Number(userVoucher?.voucher.discountAmount);

      await prisma.userVoucher.update({
        where: { id: Number(userVoucher?.id) },
        data: {
          isUse: true,
        },
      });
    }

    const totalBeforeReducePoint =
      totalPriceWithoutDiscount - totalDiscountCouponVoucher;

    if (user.point - totalBeforeReducePoint < 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: 0,
        },
      });
    }

    if (user.point - totalBeforeReducePoint >= 0) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          point: user.point - totalBeforeReducePoint,
        },
      });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...body,
        paymentProof: ``,
        invoice,
        total: Number(total),
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

    if (newTransaction.status === 'PENDING') {
      await prisma.event.update({
        where: { id: Number(eventId) },
        data: { limit: event.limit - qty },
      });
    }

    // COMPLETE
    const confirmationLink =
      NEXT_BASE_URL + `/confirmation?id=${newTransaction.id}&token=${token}`;
    if (newTransaction.total === 0) {
      await prisma.transaction.update({
        where: { id: newTransaction.id },
        data: { status: 'COMPLETE' },
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

    const schedule = new Date(Date.now() + 10 * 1000);
    scheduleJob('run every ', schedule, async () => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: newTransaction.id,
          status: 'PENDING',
        },
      });

      //EXPIRED
      if (transaction) {
        await prisma.transaction.update({
          where: { id: newTransaction.id },
          data: { status: 'EXPIRED' },
        });
        await prisma.event.update({
          where: { id: Number(eventId) },
          data: { limit: baseLimit },
        });
        await prisma.user.update({
          where: { id: newTransaction.userId },
          data: { point: baseUserPoint },
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
          data: { point: baseUserPoint },
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
      data: newTransaction,
    };
  } catch (error) {
    throw error;
  }
};
