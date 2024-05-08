'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import useCreateEvent from '@/hooks/api/event/useCreateEvent';
import { useAppSelector } from '@/redux/hooks';
import { IFormCreateEvent } from '@/types/event.type';
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
    },
    onSubmit: (values) => {
      createEvent({ ...values, userId: id });
    },
  });
  return (
    <main className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
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
          <FormTextArea
            name="description"
            error={errors.description}
            isError={!!touched.description && !!errors.description}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Description"
            value={values.description}
          />
          <PreviewImages
            fileImages={values.thumbnail_url}
            onRemoveImage={(idx: number) =>
              setFieldValue(
                'thumbnail_url',
                values.thumbnail_url?.toSpliced(idx, 1),
              )
            }
          />
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
          <div className="mb-4 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Create;
