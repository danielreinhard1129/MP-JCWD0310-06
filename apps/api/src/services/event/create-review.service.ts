import prisma from '@/prisma';
import { Review } from '@prisma/client';

interface CreateReviewBody
  extends Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export const createReviewService = async (body: CreateReviewBody) => {
  try {
    const { comment, eventId, rating, userId } = body;

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

    const createReview = await prisma.review.create({
      data: {
        comment,
        eventId: Number(event?.id),
        rating: Number(rating),
        userId: Number(user.id),
      },
    });

    return createReview;
  } catch (error) {
    throw error;
  }
};
