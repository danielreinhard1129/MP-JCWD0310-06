'use client';

import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { Transaction } from '@/types/tx.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetTransaction = (id: number) => {
  const [data, setData] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTransaction = async () => {
    try {
      const { data } = await axiosInstance.get<Transaction>(
        `/transaction/${id}`,
      );

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transaction: data, isLoading, refetch: getTransaction };
};

export default useGetTransaction;
