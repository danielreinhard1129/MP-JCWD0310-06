'use client';

import { axiosInstance } from '@/lib/axios';
import { IFormTransaction, Transaction } from '@/types/transaction.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useCreateTransaction = () => {
  const router = useRouter();
  const createTransaction = async (payload: IFormTransaction) => {
    try {
      const { transactionDetail, eventId, userId } = payload;

      const createTransactionForm = new FormData();

      createTransactionForm.append('transactionDetail', JSON.stringify(transactionDetail));
      createTransactionForm.append('userId', String(userId));
      createTransactionForm.append('eventId', String(eventId));

      await axiosInstance.post<Transaction>(
        '/transaction',
        createTransactionForm,
      );

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error);
      } else {
        console.log('Other error', error);
      }
    }
  };
  return { createTransaction };
};

export default useCreateTransaction;
