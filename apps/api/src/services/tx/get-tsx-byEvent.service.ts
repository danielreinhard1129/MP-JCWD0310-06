import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { TransactionStatus } from '@/types/transactionStatus.type';

import { Prisma } from '@prisma/client';

interface GetTransactionsQuery extends PaginationQueryParams {
  id: number;
  search: string;
  status: TransactionStatus;
}

export const getTransactionsByEventService = async (
  query: GetTransactionsQuery,
) => {
  try {
    const { page, search, sortBy, sortOrder, take, id, status } = query;

    const whereClause: Prisma.TransactionWhereInput = {
      status: status,
      event: { id },
    };

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      //   where: whereClause,
      // include: { user: true },
      skip: (page - 1) * take || 0,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        event: { include: { user: true } },
        user: true,
      },
    });

    const count = await prisma.transaction.count({ where: whereClause });

    return {
      data: transactions,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
