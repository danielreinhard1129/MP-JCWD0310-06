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

      const response = await axiosInstance.post(
        '/transaction',
        createTransactionForm,
      );

      console.log('Create Transaction Response:', response);

      console.log('Response Data:', response.data);

      const transactionId = response.data?.data?.id;
      if (transactionId) {
        router.push(`/transaction-details/${transactionId}`);
      } else {
        console.error('Transaction ID is undefined:', response.data);
        console.log(transactionId);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error:', error);
        console.error('Error response:', error.response?.data);
      } else {
        console.error('Other error:', error);
      }
    }
  };

  return { createTransaction };
};

export default useCreateTransaction;
