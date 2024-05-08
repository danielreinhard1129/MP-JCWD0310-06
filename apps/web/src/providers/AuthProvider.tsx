'use client';

import useKeepLogin from '@/hooks/api/auth/useKeepLogin';
import { FC, PropsWithChildren, useEffect } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { keepLogin } = useKeepLogin();

  useEffect(() => {
    keepLogin();
  }, []);
  return <>{children}</>;
};
