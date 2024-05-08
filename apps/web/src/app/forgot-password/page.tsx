'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import React from 'react';
import useForgotPassword from '../hooks/api/auth/useForgotPassword';
import { validationSchema } from './validationSchema';

const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        email: '',
      },

      validationSchema,
      onSubmit: ({ email }) => {
        forgotPassword(email);
      },
    });

  return (
    <main className="container mx-auto px-4">
      <div className="mt-16 flex justify-center">
        <Card className="w-[350px] ">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">
              Forgot your passsword?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="email"
                  label="Email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder="example@mail.com"
                  type="email"
                  value={values.email}
                />
                <Button
                  type="submit"
                  className=" mt-6 w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ?? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'Email sent' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPassword;
