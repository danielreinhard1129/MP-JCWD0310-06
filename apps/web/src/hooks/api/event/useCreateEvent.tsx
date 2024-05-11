'use client';

import { axiosInstance } from '@/lib/axios';
import { IFormCreateEvent } from '@/types/event.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';

const useCreateEvent = () => {
  const router = useRouter();
  const createEvent = async (payload: IFormCreateEvent) => {
    try {
      const {
        title,
        description,
        thumbnail_url,
        userId,
        limit,
        start_date,
        end_date,
        time,
        locationId,
        location
      } = payload;

      const createEventForm = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        console.log(key, value);
      }

      const timeToString = String(time);

      createEventForm.append('title', title);
      createEventForm.append('description', description);
      createEventForm.append('limit', String(limit));
      createEventForm.append('userId', String(userId));
      createEventForm.append('start_date', new Date(start_date).toISOString());
      createEventForm.append('end_date', new Date(end_date || 0).toISOString());
      createEventForm.append('time', timeToString);
      createEventForm.append('locationId', String(locationId));
      createEventForm.append('location.city', location.city);

      thumbnail_url.forEach((file: FileWithPath) => {
        createEventForm.append('thumbnail_url', file);
      });

      await axiosInstance.post<Event>('/events', createEventForm);

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error);
      } else {
        console.log('Other error', error);
      }
    }
  };
  return { createEvent };
};

export default useCreateEvent;
