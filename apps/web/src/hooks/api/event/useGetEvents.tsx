'use client';

import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetEvents = (id: number) => {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get<Event>(`/events`);

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
    getEvents();
  }, []);

  return { event: data, isLoading, refetch: getEvents };
};

export default useGetEvents;