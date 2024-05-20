'use client';

import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetEventsQuery extends IPaginationQueries {
  id: number;
  search?: string;
}

const useGetEventsByOrganizer = (queries: IGetEventsQuery) => {
  const [data, setData] = useState<Event[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get('/events/organizer', {
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta);
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

  return { data, isLoading, meta, refetch: getEvents };
};

export default useGetEventsByOrganizer;
