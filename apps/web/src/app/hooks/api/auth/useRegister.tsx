'use client';

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
        alert(error.response?.data);
      }
    }
  };
  return { register };
};

export default useRegister;
