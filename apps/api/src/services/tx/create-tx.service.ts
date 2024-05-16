import prisma from '@/prisma';
import { Transaction, TransactionStatus } from '@prisma/client';
import { scheduleJob } from 'node-schedule';

interface CreateTransactionBody
  extends Omit<Transaction, 'createdAt' | 'updatedAt' | 'id'> {
  isPointUse: boolean;
  pointRedux: number;
}

export const createTransactionService = async (
  body: CreateTransactionBody,
  // file: Express.Multer.File,
) => {
  try {
    const { eventId, userId, total, isPointUse, pointRedux = 50000 } = body;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('user not found');
    }
    const pointAnjing = String(user.point);
    let point = 0;

    if (isPointUse) {
      point = user?.point;
    }

    const event = await prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    if (!event) {
      throw new Error('event not found');
    }
    const tempTotal = total - point;

    const newTransaction = await prisma.transaction.create({
      data: {
        total: tempTotal,
        // paymentProof: `/txProof/`,
        // total: 500000,
        userId: user.id,
        eventId: event.id,
        status: 'PENDING',
      },
    });

    await prisma.transactionDetail.create({
      data: { qty: 2, transactionId: newTransaction.id },
    });

    if (isPointUse) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          point: 0,
        },
      });
    }


      const shcedule = new Date(Date.now() + 5 * 1000);
      scheduleJob('run every ', shcedule, async () => {
        const transaction = await prisma.transaction.findFirst({
          where: {
            id: newTransaction.id,
            paymentProof: newTransaction.paymentProof,
          },
        });
        if (transaction) {
          await prisma.transaction.update({
            where: { id: newTransaction.id },
            data: { status: 'CANCELLED' },
          });
          await prisma.user.update({
            where: { id: newTransaction.userId },
            data: { point: Number(pointAnjing) },
          });
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
    return { message: 'tes' };
  } catch (error) {
    throw error;
  }
};
