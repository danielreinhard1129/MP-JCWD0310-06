import prisma from '@/prisma';

export const getTransactionService = async (id: number) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });

    if (!transaction) {
      throw new Error('transaction not found');
    }
    
    return transaction;
  } catch (error) {
    throw error;
  }
};
