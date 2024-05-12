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

interface RegisterArgs extends Omit<User, 'id'> {
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
        // FIXME = change alert to toast
        toast({
          variant: 'destructive',
          title: error.response?.data,
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };
  return { register };
};

export default useRegister;
