/* eslint-disable react/no-unescaped-entities */
'use client';

import Dropzone from '@/components/Dropzone';
import FormInput from '@/components/FormInput';
import FormTextArea from '@/components/FormTextArea';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useCreateEvent from '@/hooks/api/event/useCreateEvent';
import { useAppSelector } from '@/redux/hooks';
import { IFormEvent } from '@/types/event.type';
import { validationSchema } from './validationSchema';
import { addDays } from 'date-fns';
import { useFormik } from 'formik';
import { categories, cities } from './list';

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
  } = useFormik<IFormEvent>({
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
      price: 0,
      category: '',
      voucherAmount: 0,
      voucherCode: '',
      voucherExpDate: new Date(),
      voucherLimit: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      createEvent({ ...values, userId: id });
    },
  });

  return (
    <main className="container mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-8 xl:gap-10">
          <h1 className="text-4xl font-bold">Create Events</h1>
          {/* TITLE INPUT */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">
              What's the name of your event?
            </h1>
            <FormInput
              name="title"
              label=""
              error={errors.title}
              isError={!!touched.title && !!errors.title}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Title"
              type="text"
              value={values.title}
            />
          </div>

          {/* DATE INPUT */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">When do your event start?</h1>
            <div className="grid w-full grid-cols-3 gap-4 xl:w-fit">
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
                label="End Date"
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
          </div>

          {/* TICKET LIMIT AND PRICE */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">
              What's the price and total ticket?
            </h1>
            <div className="flex items-end gap-4">
              <p className="text-md -mr-2 pb-2 font-semibold opacity-50">Rp.</p>
              <FormInput
                name="price"
                label="Price"
                error={errors.price}
                isError={!!touched.price && !!errors.price}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                value={values.price}
              />
              <FormInput
                name="limit"
                label="Total Ticket"
                error={errors.limit}
                isError={!!touched.limit && !!errors.limit}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Limit"
                type="number"
                value={values.limit}
              />
            </div>
          </div>

          {/* DESCRIPTION & CATEGORY INPUT */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Describe your event</h1>
            <select
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
              className="rounded-md border p-2 text-sm text-black/70"
            >
              <option value="" disabled selected>
                Select category...
              </option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <FormTextArea
              name="description"
              error={errors.description}
              isError={!!touched.description && !!errors.description}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Description"
              value={values.description}
            />
          </div>

          {/* VENUE INPUT */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">
              Where's your event location?
            </h1>
            <div className="flex flex-col gap-4">
              <select
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                className="rounded-md border p-2 text-sm text-black/70"
              >
                <option value="" disabled selected>
                  Select location...
                </option>
                {cities.map((city) => (
                  <option value={city}>{city}</option>
                ))}
              </select>
              <FormInput
                name="address"
                label="Address (optional)"
                error={errors.address}
                isError={!!touched.address && !!errors.address}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Address"
                type="text"
                value={String(values.address)}
              />
            </div>
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

          {/* CREATE VOUCHER */}
          <FormInput
            name="voucherCode"
            label="Voucher Code"
            error={errors.voucherCode}
            isError={!!touched.voucherCode && !!errors.voucherCode}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Voucher Code"
            type="text"
            value={String(values.voucherCode)}
          />
          <FormInput
            name="voucherAmount"
            label="Voucher Amount"
            error={errors.voucherAmount}
            isError={!!touched.voucherAmount && !!errors.voucherAmount}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Voucher Amount"
            type="number"
            value={values.voucherAmount || 0}
          />
          <FormInput
            name="voucherLimit"
            label="Voucher Limit"
            error={errors.voucherLimit}
            isError={!!touched.voucherLimit && !!errors.voucherLimit}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Voucher Limit"
            type="number"
            value={values.voucherLimit || 0}
          />
          <FormInput
            name="voucherExpDate"
            label="Voucher Expired Date"
            error={errors.voucherExpDate}
            isError={!!touched.voucherExpDate && !!errors.voucherExpDate}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Voucher Expired Date"
            type="date"
            value={values.voucherExpDate || 0}
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
