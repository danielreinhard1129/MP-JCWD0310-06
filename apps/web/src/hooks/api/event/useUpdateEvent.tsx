'use client';
import { axiosInstance } from '@/lib/axios';
import { IFormEvent } from '@/types/event.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';

const useUpdateEvent = (eventId: number) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateEvent = async (payload: Partial<IFormEvent>) => {
    setIsLoading(true);
    try {
      const {
        address,
        category,
        description,
        end_date,
        limit,
        location,
        price,
        start_date,
        thumbnail_url,
        time,
        title,
      } = payload;

      const eventUpdateForm = new FormData();

      if (title) eventUpdateForm.append('title', title);
      if (address) eventUpdateForm.append('address', address);
      if (category) eventUpdateForm.append('category', category);
      if (description) eventUpdateForm.append('description', description);
      if (location) eventUpdateForm.append('location', location);
      if (price) eventUpdateForm.append('price', String(price));
      if (limit) eventUpdateForm.append('limit', String(limit));
      if (time) eventUpdateForm.append('time', time);
      if (start_date) eventUpdateForm.append('start_date', String(start_date));
      if (end_date) eventUpdateForm.append('end_date', String(end_date));
      if (thumbnail_url)
        thumbnail_url.forEach((file: FileWithPath) => {
          eventUpdateForm.append('thumbnail_url', file);
        });
      await axiosInstance.patch(`/events/${eventId}`, eventUpdateForm);
      router.push('/organizer');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateEvent, isLoading };
};

export default useUpdateEvent;
