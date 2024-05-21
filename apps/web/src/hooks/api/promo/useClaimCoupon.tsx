'use client';

import { axiosInstance } from '@/lib/axios';
import { Coupon } from '@/types/coupon.type';
import { Voucher } from '@/types/userVoucher.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface ClaimVoucherResponse {
  message: string;
  data: Voucher;
}

interface ClaimCouponArgs extends Pick<Coupon, 'userId' | 'code'> {}

const useClaimCoupon = () => {
  const router = useRouter();
  const claimCoupon = async (payload: ClaimCouponArgs) => {
    const { code, userId } = payload;
    try {
      const claimVoucherForm = new FormData();

      claimVoucherForm.append('userId', String(userId));
      claimVoucherForm.append('code', code);

      await axiosInstance.post<ClaimVoucherResponse>(`/events/${userId}`);
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };
  return { claimCoupon };
};

export default useClaimCoupon;
