import prisma from '@/prisma';

export const getEventsService = async (id: number) => {
  try {
    const events = await prisma.event.findMany({
      where: { id },
      include: { user: true },
    });

    return events;
  } catch (error) {
    throw error;
  }
};
