import prisma from '@/prisma';
import { Event } from '@prisma/client';

interface CreateEventBody
  extends Omit<Event, 'id' | 'deletedAt' | 'createdAt' | 'updatedAt'> {}

export const createEventService = async (
  body: CreateEventBody,
  file: Express.Multer.File,
) => {
  try {
    const { title, userId, limit, price } = body;

    const existingTitle = await prisma.event.findFirst({
      where: { title },
    });

    if (existingTitle) {
      throw new Error('title already in use');
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return await prisma.event.create({
      data: {
        ...body,
        thumbnail_url: `/images/${file.filename}`,
        limit: Number(limit),
        userId: Number(userId),
        price: Number(price),
      },
    });
  } catch (error) {
    throw error;
  }
};
