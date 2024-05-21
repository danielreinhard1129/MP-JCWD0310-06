import { transporter } from '@/libs/nodemailer';
import prisma from '@/prisma';
import { Transaction } from '@prisma/client';

export const rejectTransactionService = async (
  body: Pick<Transaction, 'id'>,
): Promise<void> => {
  try {
    const { id } = body;
    const tx = await prisma.transaction.findFirst({
      where: { id },
      include: {
        event: true,
        user: { include: { UserVoucher: true, UserCoupon: true } },
      },
    });

    const baseUserPoint = tx?.user.point;

    const baseLimit = tx?.event.limit;

    if (!tx) {
      throw new Error('Transaction not found !');
    }

    await prisma.transaction.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    if (tx.pointUse) {
      await prisma.user.update({
        where: { id: tx.userId },
        data: { point: tx.pointUse },
      });
    }

    if (tx.isUseVoucher) {
      await prisma.userVoucher.update({
        where: { id: Number(tx.userVoucherId) },
        data: {
          isUse: false,
        },
      });
    }

    if (tx.isUseCoupon) {
      await prisma.userCoupon.update({
        where: { id: Number(tx.userCouponId) },
        data: {
          isUse: false,
        },
      });
    }

    await prisma.event.update({
      where: { id: tx.eventId },
      data: { limit: baseLimit },
    });

    await transporter.sendMail({
      from: 'Admin',
      to: tx.user.email,
      subject: 'Order cancelled',
      html: `<p>Your order with invoice ${tx.invoice} has been cancelled by Admin</p>`,
    });
  } catch (error) {
    throw error;
  }
};
