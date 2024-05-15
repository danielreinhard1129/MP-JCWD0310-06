import prisma from '@/prisma';

export const getEventsByOrganizerService = async (id: string) => {
  try {
    const events = await prisma.event.findMany({
      where: { userId: Number(id) },
      include: { user: true },
    });

    return events;
  } catch (error) {
    throw error;
  }
};
