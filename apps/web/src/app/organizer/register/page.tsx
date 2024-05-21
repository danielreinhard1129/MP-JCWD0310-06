'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import useRegister from '../../../hooks/api/auth/useRegister';
import { validationSchema } from './validationSchema';
import registerImage from '../../../../public/register.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OrganizerRegister = () => {
  const { register } = useRegister();
  const router = useRouter();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        fullName: '',
        email: '',
        password: '',
        referralCode: '',
        point: 0,
        role: 'organizer',
      },

      validationSchema,
      onSubmit: (values) => {
        register(values as any);
      },
    });
  return (
    <main className="container fixed left-0 right-0 z-50 mx-auto grid h-[90vh] grid-flow-col grid-cols-1 bg-inherit p-0 xl:grid-cols-2">
      <section className="flex items-center justify-center xl:justify-start">
        <Card className="w-[450px] border-none p-8 shadow-none xl:p-0">
          <CardHeader>
            <CardTitle className="text-primary mb-8 text-3xl">
              Register As Organizer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 p-0">
                {/* NAME */}
                <FormInput
                  name="fullName"
                  label="Full Name"
                  error={errors.fullName}
                  isError={!!touched.fullName && !!errors.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="name"
                  type="text"
                  value={values.fullName}
                />
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
              </div>
              <Button className="mb-2 mt-6 w-full rounded-md" type="submit">
                Register
              </Button>
              <div className="grid justify-between xl:flex">
                <div className="flex pt-0">
                  <p className="text-xs">
                    Already have account?{' '}
                    <span>
                      <Button
                        variant="link"
                        className="p-0 text-xs"
                        onClick={() => {
                          router.push('/login');
                        }}
                      >
                        Login
                      </Button>
                    </span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="text-xs">
                    Not an organizer?{' '}
                    <span>
                      <Button
                        variant="link"
                        className="p-0 text-xs"
                        onClick={() => {
                          router.push('/register');
                        }}
                      >
                        Register as user
                      </Button>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className="hidden h-full w-full bg-inherit pt-4 md:flex">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={registerImage}
            alt="register"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default OrganizerRegister;
