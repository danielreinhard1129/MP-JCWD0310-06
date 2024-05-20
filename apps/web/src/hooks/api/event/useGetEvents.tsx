/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { useEffect, useState } from 'react';

interface IGetEventsQuery extends IPaginationQueries {
  search?: string;
  id?: number;
}

const useGetEvents = (queries: IGetEventsQuery) => {
  const [data, setData] = useState<Event[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get('/events', {
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return { data, meta, isLoading };
};

export default useGetEvents;
