import { axiosInstance } from '@/lib/axios';
import { IFormTransaction, Transaction } from '@/types/transaction.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';

const UseConfirmTransaction = (transactionId: number) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const confirmTransaction = async (payload: Partial<IFormTransaction>) => {
    setIsLoading(true);
    try {
      const { paymentProof } = payload;

      const confirmTransactionForm = new FormData();

      if (paymentProof)
        paymentProof.forEach((file: FileWithPath) => {
          confirmTransactionForm.append('paymentProof', file);
        });

      await axiosInstance.patch<Transaction>(
        `/transaction/${transactionId}`,
        confirmTransactionForm,
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return { confirmTransaction, isLoading };
};

export default UseConfirmTransaction;
