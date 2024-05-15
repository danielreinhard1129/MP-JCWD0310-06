import { axiosInstance } from '@/lib/axios';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { useDispatch } from 'react-redux';

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const dispatch = useDispatch();

  const keepLogin = async () => {
    try {
      const { data } =
        await axiosInstance.get<KeepLoginResponse>('/auth/keep-login');

      dispatch(loginAction(data.data));
    } catch (error) {}
  };

  return { keepLogin };
};

export default useKeepLogin;
