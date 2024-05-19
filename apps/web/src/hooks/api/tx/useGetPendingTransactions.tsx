/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { Transaction, TransactionStatus } from '@/types/transaction.type';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetPendingTransactionsQuery extends IPaginationQueries {
  id: number;
  search?: string;
  status?: TransactionStatus;
}

const useGetPendingTransactions = (queries: IGetPendingTransactionsQuery) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [metaPending, setMetaPending] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPendingTransactions = async () => {
    try {
      const { data } = await axiosInstance.get('/transaction/organizer', {
        params: queries,
      });

      setData(data.data);
      setMetaPending(data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPendingTransactions();
  }, [queries?.page, queries?.search, queries.id]);

  return { data, isLoading, metaPending, refetch: getPendingTransactions };
};

export default useGetPendingTransactions;
