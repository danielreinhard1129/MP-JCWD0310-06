import prisma from '@/prisma';
import { Transaction } from '@prisma/client';

interface CreateTransactionBody
  extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> {}

export const createTransactionService = async (
  body: CreateTransactionBody,
  file: Express.Multer.File,
) => {
  try {
    const { eventId, userId, qty } = body;

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
    
    const total = event?.price * qty;
    
    return await prisma.transaction.create({
      data: {
        ...body,
        paymentProof: `/txProof/${file.filename}`,
        total: Number(total),
        userId: Number(userId),
        eventId: Number(eventId),
      },
      include: {
        event: true,
        user: true,
      },
    });
  } catch (error) {
    throw error;
  }
};
