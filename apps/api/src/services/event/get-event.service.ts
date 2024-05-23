import prisma from '@/prisma';

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: {
        user: true,
        Voucher: {
          where: { eventId: id },
        },
        Review: {
          where: { eventId: id },
          include: { user: true },
        },
        Transaction: true,
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
