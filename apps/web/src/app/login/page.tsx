'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import useLogin from '../hooks/api/auth/useLogin';
import { validationSchema } from './validationSchema';

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const { values, handleSubmit, errors, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: (values) => {
        login(values);
      },
    });
  return (
    <main className="container mx-auto">
      <div className="flex justify-center">
        <Card className="w-[450px] rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-primary mb-5 text-center text-3xl">
              Welcome to PurwaPora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                  name="email"
                  label="Email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="email"
                  type="email"
                  value={values.email}
                />

                {/* PASSWORD */}
                <FormInput
                  name="password"
                  label="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />

                <p
                  className="cursor-pointer text-end text-xs"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot Password
                </p>
              </div>
              <Button className="mt-6 w-full" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;
