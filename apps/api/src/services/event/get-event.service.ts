import prisma from '@/prisma';

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: {
        user: true,
        Voucher: true,
        Review: {
          where: { userId: id },
          include: { user: true },
        },
      },
    });

    if (!event) {
      throw new Error('event not found');
    }

    return event;
  } catch (error) {
    throw error;
  }
};
