'use client';

import SkeletonEventDetail from '@/app/[id]/components/SkeletonEventDetail';
import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuardEvents(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        redirect('/login');
      }
    }, [id, isLoading]);

    if (isLoading || !id) {
      return (
        <SkeletonEventDetail />
      );
    }

    return <Component {...props} />;
  };
}
