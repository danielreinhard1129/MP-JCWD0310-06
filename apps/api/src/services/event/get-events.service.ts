import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetEventsQuery extends PaginationQueryParams {
  search: string;
}

export const getEventsService = async (query: GetEventsQuery) => {
  try {
    const { page, search, sortBy, sortOrder, take } = query;

    const whereClause: Prisma.EventWhereInput = {
      title: { contains: search },
    };

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true },
    });

    const count = await prisma.event.count({ where: whereClause });

    return {
      data: events,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
