import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email(),
});
