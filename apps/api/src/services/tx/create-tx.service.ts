import prisma from '@/prisma';
import { Transaction, TransactionStatus } from '@prisma/client';
import { scheduleJob } from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';

interface CreateTransactionBody
  extends Omit<Transaction, 'createdAt' | 'updatedAt' | 'id'> {}

export const createTransactionService = async (
  body: CreateTransactionBody,
  // file: Express.Multer.File,
) => {
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

    const event = await prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    if (!event) {
      throw new Error('event not found');
    }

    const invoice = uuidv4();

    const totalPrice = event.price * qty;

    let coupon = null;

    if (isUseCoupon) {
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

    if (isUseVoucher) {
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

    if (user.point - totalDiscount > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          point: user.point - totalDiscount,
        },
      });
    } else if (user.point - totalDiscount < 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          point: 0,
        },
      });
    }

    const schedule = new Date(Date.now() + 10 * 1000);
    scheduleJob('run every ', schedule, async () => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: newTransaction.id,
          paymentProof: newTransaction.paymentProof,
        },
        include: {
          event: true,
        },
      });
      if (transaction) {
        const cancelledTx = await prisma.transaction.update({
          where: { id: newTransaction.id },
          data: { status: 'CANCELLED' },
        });
        if (cancelledTx) {
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
        }
      }

      console.log('cron executed');
      return { data: transaction };
    });

    // const cancelledTx = await prisma.transaction.findFirst({
    //   where: { id: newTransaction.id, status: 'CANCELLED' },
    // });
    // console.log(cancelledTx);

    // if (cancelledTx) {
    //   await prisma.user.update({
    //     where: { id: newTransaction.userId },
    //     data: { point: 50000 },
    //   });
    // }

    //RETURN VALUE UNTUK DIOKIRIM KE FE
    return { data: newTransaction };
  } catch (error) {
    throw error;
  }
};
