'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useCreateEvent from '@/hooks/api/event/useCreateEvent';
import { useAppSelector } from '@/redux/hooks';
import { IFormCreateEvent } from '@/types/event.type';
import { addDays } from 'date-fns';
import { useFormik } from 'formik';

const Create = () => {
  const { createEvent } = useCreateEvent();

  const { id } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik<IFormCreateEvent>({
    initialValues: {
      title: '',
      thumbnail_url: [],
      description: '',
      limit: 0,
      start_date: new Date(),
      end_date: addDays(new Date(), 1),
      time: '',
      address: '',
      location: '',
    },
    onSubmit: (values) => {
      createEvent({ ...values, userId: id });
    },
  });

  return (
    <main className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {/* TITLE INPUT */}
          <FormInput
            name="title"
            label="Title"
            error={errors.title}
            isError={!!touched.title && !!errors.title}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Title"
            type="text"
            value={values.title}
          />
          {/* TICKET LIMIT */}
          <FormInput
            name="limit"
            label="Limit"
            error={errors.limit}
            isError={!!touched.limit && !!errors.limit}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Limit"
            type="number"
            value={values.limit}
          />
          {/* DATE INPUT */}
          <div className="w-fit">
            <FormInput
              name="start_date"
              label="Start Date"
              error={errors.start_date}
              isError={!!touched.start_date && !!errors.start_date}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Start Date"
              type="date"
              value={values.start_date}
            />
            <FormInput
              name="end_date"
              label="Start Date"
              error={errors.end_date}
              isError={!!touched.end_date && !!errors.end_date}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="End Date"
              type="date"
              value={values.end_date || 0}
            />
            <FormInput
              name="time"
              label="Time"
              error={errors.time}
              isError={!!touched.time && !!errors.time}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Time"
              type="time"
              value={values.time}
            />
          </div>
          {/* DESCRIPTION INPUT */}
          <FormTextArea
            name="description"
            error={errors.description}
            isError={!!touched.description && !!errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Description"
            value={values.description}
          />
          {/* VENUE INPUT */}
          <div>
            <FormInput
              name="location"
              label="Location"
              error={errors.location}
              isError={!!touched.location && !!errors.location}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Location"
              type="text"
              value={values.location}
            />
            <FormInput
              name="address"
              label="Address"
              error={errors.address}
              isError={!!touched.address && !!errors.address}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Address"
              type="text"
              value={String(values.address)}
            />
          </div>
          {/* PREVIEW IMAGE */}
          <PreviewImages
            fileImages={values.thumbnail_url}
            onRemoveImage={(idx: number) =>
              setFieldValue(
                'thumbnail_url',
                values.thumbnail_url?.toSpliced(idx, 1),
              )
            }
          />
          {/* UPLOAD IMAGE */}
          <Dropzone
            isError={Boolean(errors.thumbnail_url)}
            label="Thumbnail"
            onDrop={(files) =>
              setFieldValue('thumbnail_url', [
                ...values.thumbnail_url,
                ...files.map((file) => file),
              ])
            }
          />
          {/* SUBMIT */}
          <div className="mb-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AuthGuard(Create);