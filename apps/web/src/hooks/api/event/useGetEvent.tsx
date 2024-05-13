'use client';

import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetEvent = (id: number) => {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvent = async () => {
    try {
      const { data } = await axiosInstance.get<Event>(`/events/${id}`);

      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return { event: data, isLoading, refetch: getEvent };
};

export default useGetEvent;
