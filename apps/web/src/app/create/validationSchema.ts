import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Category is required'),
  thumbnail_url: Yup.array().min(1),
  limit: Yup.number().required('Limit is required'),
  time: Yup.date().required('Time is required'),
  start_date: Yup.date().required('Start date is required'),
  end_date: Yup.date().required('End date is required'),
});
