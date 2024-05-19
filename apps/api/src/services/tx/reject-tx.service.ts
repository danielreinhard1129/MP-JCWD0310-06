import prisma from '@/prisma';
import { Transaction } from '@prisma/client';

export const rejectTransactionService = async (
  body: Pick<Transaction, 'id'>,
): Promise<void> => {
  try {
    const { id } = body;
    const tx = await prisma.transaction.findFirst({
      where: { id },
      select: { status: true },
    });

    if (!tx) {
      throw new Error('Transaction not found !');
    }

    await prisma.transaction.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  } catch (error) {
    throw error;
  }
};
