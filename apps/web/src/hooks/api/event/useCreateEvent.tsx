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
      } = payload;

      const createEventForm = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        console.log('key', key);
        console.log('value', value);
      }

      createEventForm.append('title', title);
      createEventForm.append('description', description);
      createEventForm.append('userId', String(userId));

      thumbnail_url.forEach((file: FileWithPath) => {
        createEventForm.append('thumbnail_url', file);
      });

      await axiosInstance.post<Event>('/events', createEventForm);

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };
  return { createEvent };
};

export default useCreateEvent;
