'use client';
import useGetEvent from '@/hooks/api/event/useGetEvent';
import useUpdateEvent from '@/hooks/api/event/useUpdateEvent';
import { getChangedValues } from '@/utils/getChangedValues';
import { addDays } from 'date-fns';
import { Formik } from 'formik';
import EventUpdateForm from './components/EventUpdateForm';
import { useAppSelector } from '@/redux/hooks';
import Unauthorized from '@/components/Unauthorized';
import { validationSchema } from './validationSchema';

const EditEvent = ({ params }: { params: { id: String } }) => {
  const { id } = useAppSelector((state) => state.user);
  const { event, isLoading: isLoadingGetEvent } = useGetEvent(
    Number(params.id),
  );
  const { isLoading, updateEvent } = useUpdateEvent(Number(params.id));

  const initialValues = {
    title: event?.title || '',
    thumbnail_url: [],
    description: event?.description || '',
    limit: event?.limit || 0,
    start_date: event?.start_date || new Date(),
    end_date: event?.end_date || addDays(new Date(), 1),
    time: event?.time || '',
    address: event?.address || '',
    location: event?.location || '',
    price: event?.price || 0,
    category: event?.category || '',
  };
  if (isLoadingGetEvent) {
    return (
      <div className=" container pt-24 text-center  text-4xl font-extrabold">
        Loading
      </div>
    );
  }
  if (id !== event?.userId) {
    return <Unauthorized />;
  }

  return (
    <main>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = getChangedValues(values, initialValues);

          if (!payload.thumbnail_url?.length) {
            delete payload.thumbnail_url;
          }
          updateEvent(payload);
        }}
        enableReinitialize
        validationSchema={validationSchema}
      >
        <EventUpdateForm isLoading={isLoading} />
      </Formik>
    </main>
  );
};

export default EditEvent;
// function useUpdate(arg0: number): { isLoading: any; updateEvent: any } {
//   throw new Error('Function not implemented.');
// }
