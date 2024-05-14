'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import useLogin from '../../hooks/api/auth/useLogin';
import { validationSchema } from './validationSchema';
import loginImage from '../../../public/login.jpg';
import Image from 'next/image';

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const { values, handleSubmit, errors, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        role: '',
      },
      validationSchema,
      onSubmit: (values) => {
        login(values);
      },
    });
  return (
    <main className="container fixed left-0 right-0 z-50 mx-auto grid h-[90vh] w-screen grid-flow-col grid-cols-1 bg-inherit p-0 xl:grid-cols-2">
      <section className="flex w-full items-center justify-center xl:justify-start">
        <Card className="w-[450px] rounded-lg border-none p-8 xl:p-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-primary mb-8 text-3xl">Login</CardTitle>
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
                  placeholder="email@mail.com"
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
              </div>
              <Button className="mt-6 w-full rounded-md" type="submit">
                Login
              </Button>
              <div className="flex w-full justify-between py-4">
                <p className="text-xs">
                  Don't have account?{' '}
                  <Button
                    variant="link"
                    className="p-0 text-xs font-semibold"
                    onClick={() => router.push('/register')}
                  >
                    Register
                  </Button>
                </p>
                <Button
                  variant="link"
                  className="cursor-pointer p-0 text-end text-xs"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className="hidden h-full w-full bg-inherit pt-4 xl:flex">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={loginImage}
            alt="login image"
            fill
            className="absolute h-full w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default Login;
