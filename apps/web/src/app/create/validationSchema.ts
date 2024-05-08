import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Category is required'),
  thumbnail: Yup.array().min(1)
})