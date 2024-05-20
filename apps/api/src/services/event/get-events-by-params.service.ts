import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';

interface getEventsByParams extends PaginationQueryParams {
  category?: string;
  location?: string;
}

export const getEventsByParamsService = async (query: getEventsByParams) => {
  try {
    const { category, location, take, page, sortBy, sortOrder } = query;

    let where = {};
    if (category) {
      where = { ...where, category };
    }
    if (location) {
      where = { ...where, location };
    }

    const events = await prisma.event.findMany({
      where,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    if (events.length === 0) {
      throw new Error('no event found');
    }

    return events;
  } catch (error) {
    throw error;
  }
};
