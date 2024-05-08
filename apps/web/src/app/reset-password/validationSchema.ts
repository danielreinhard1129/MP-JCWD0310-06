import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Your password is too short'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password')], 'Your password do not match'),
});
