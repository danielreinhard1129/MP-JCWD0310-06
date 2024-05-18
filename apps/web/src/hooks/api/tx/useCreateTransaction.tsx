'use client';

import { axiosInstance } from '@/lib/axios';
import { IFormTransaction, Transaction } from '@/types/transaction.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useCreateTransaction = () => {
  const router = useRouter();
  const createTransaction = async (
    payload: Omit<IFormTransaction, 'paymentProof'>,
  ) => {
    try {
      const { eventId, userId, qty } = payload;

      const createTransactionForm = new FormData();

      createTransactionForm.append('qty', String(qty));
      createTransactionForm.append('userId', String(userId));
      createTransactionForm.append('eventId', String(eventId));

      await axiosInstance.post<Transaction>(
        '/transaction',
        createTransactionForm,
      );

      router.push('/transaction-details');
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
