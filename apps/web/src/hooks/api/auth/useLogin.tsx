'use client';

import { axiosInstance } from '@/lib/axios';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface LoginResponses {
  message: string;
  data: User;
  token: string;
}

interface LoginArgs extends Omit<User, 'id' | 'fullName' | 'referral_code'> {
  password: string;
}
const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        '/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME = change alert to toast
        alert(error.response?.data);
      }
    }
  };

  return { login };
};

export default useLogin;
