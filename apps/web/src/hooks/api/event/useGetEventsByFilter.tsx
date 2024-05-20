import { axiosInstance } from '@/lib/axios';
import { Event } from '@/types/event.type';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IGetEventsQuery extends IPaginationQueries {
  category?: string;
  location?: string;
}

const useGetEventsByFilter = (queries: IGetEventsQuery) => {
  const [data, setData] = useState<Event[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEventsByFilter = async () => {
    try {
      let endpoint = '/events';
      const params: any = {};

      if (queries.location !== 'all') {
        params.location = queries.location;
      }

      if (queries.category !== 'all') {
        params.category = queries.category;
      }

      if (queries.location === 'all' && queries.category === 'all') {
      } else if (queries.location !== 'all' && queries.category === 'all') {
        endpoint = '/events/filter';
      } else if (queries.location === 'all' && queries.category !== 'all') {
        endpoint = '/events/filter';
      } else {
        endpoint = '/events/filter';
      }

      const { data } = await axiosInstance.get(endpoint, {
        params,
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
    getEventsByFilter();
  }, [queries.page, queries.location, queries.category]);

  return { data, isLoading, meta, refetch: getEventsByFilter };
};

export default useGetEventsByFilter;
