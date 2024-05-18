// import prisma from '@/prisma';

// export const getEventsService = async (id: string) => {
//   try {
//     const events = await prisma.event.findMany({
//       where: { userId: Number(id) },
//       include: { user: true },
//     });

//     return events;
//   } catch (error) {
//     throw error;
//   }
// };

import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetEventsQuery extends PaginationQueryParams {
  id: number;
  search: string;
}

export const getEventsByOrganizerService = async (
  query: GetEventsQuery,

) => {
  try {
    const { page, search, sortBy, sortOrder, take,id } = query;

    const whereClause: Prisma.EventWhereInput = {
      title: { contains: search },
      userId: Number(id),
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
