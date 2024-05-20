'use client';

import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface RegisterResponse {
  message: string;
  data: User;
}

interface RegisterArgs
  extends Omit<User, 'id' | 'pointExpiredDate' | 'userReward'> {
  password: string;
}
const useRegister = () => {
  const router = useRouter();
  const register = async (payload: RegisterArgs) => {
    try {
      await axiosInstance.post<RegisterResponse>('/auth/register', payload);
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'There was a problem with your request.',
          description: error.response?.data,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };
  return { register };
};

export default useRegister;
