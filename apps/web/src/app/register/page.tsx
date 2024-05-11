'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import useRegister from '../../hooks/api/auth/useRegister';
import { validationSchema } from './validationSchema';

const Register = () => {
  const { register } = useRegister();
  const router = useRouter();

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        fullName: '',
        email: '',
        password: '',
        referral_code: '',
        point: 0,
        role: '',
      },

      validationSchema,
      onSubmit: (values) => {
        register(values);
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
              <div className="grid w-full items-center gap-4 p-4">
                {/* NAME */}
                <FormInput
                  name="fullName"
                  label="Full Name"
                  error={errors.fullName}
                  isError={!!touched.fullName && !!errors.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="full name"
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

                {/* REFERRAL CODE */}
                <FormInput
                  name="referral_code"
                  label="Referral Code"
                  error={errors.referral_code}
                  isError={!!touched.referral_code && !!errors.referral_code}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="referral code"
                  type="text"
                  value={values.referral_code}
                />
              </div>
              <Button className="mt-6 w-full" type="submit">
                Register
              </Button>
              <div className="mt-5 text-center text-sm">
                <p>Want to create an Event?</p>
                <Button
                  variant="link"
                  onClick={() => {
                    router.push('/organizer-register');
                  }}
                >
                  Register as an Event Organizer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
