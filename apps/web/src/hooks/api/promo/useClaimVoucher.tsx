'use client';

import { axiosInstance } from '@/lib/axios';
import { Voucher } from '@/types/userVoucher.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface ClaimVoucherResponse {
  message: string;
  data: Voucher;
}

interface ClaimVoucherArgs
  extends Pick<Voucher, 'eventId' | 'code' | 'userId'> {}

const useClaimVoucher = () => {
  const router = useRouter();
  const claimVoucher = async (payload: ClaimVoucherArgs) => {
    const { eventId, code, userId } = payload;
    try {
      const claimVoucherForm = new FormData();

      claimVoucherForm.append('userId', String(userId));
      claimVoucherForm.append('code', code);

      await axiosInstance.post<ClaimVoucherResponse>(`/events/${eventId}`);
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };
  return { claimVoucher };
};

export default useClaimVoucher;
