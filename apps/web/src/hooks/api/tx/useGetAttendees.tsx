'use client';

import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { Transaction, TransactionStatus } from '@/types/transaction.type';
// import { Transaction } from '@/types/tx.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetTransactionsQuery extends IPaginationQueries {
  id: number;
  search?: string;
  status?: TransactionStatus;
}

const useGetAttendees = (queries: IGetTransactionsQuery) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTransactionsAttendees = async () => {
    try {
      const { data } = await axiosInstance.get(
        '/transaction/attendees',
        {
          params: queries,
        },
      );

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactionsAttendees();
  }, [queries?.page, queries?.search, queries.id]);

  return { data, isLoading, meta, refetch: getTransactionsAttendees };
};

export default useGetAttendees;
