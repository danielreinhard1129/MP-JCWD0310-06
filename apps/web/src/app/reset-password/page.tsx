'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import { notFound, useSearchParams } from 'next/navigation';
import React from 'react';
import useResetPassword from '../../hooks/api/auth/useResetPassword';
import { validationSchema } from './validationSchema';

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }
  const { resetPassword, isLoading } = useResetPassword();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },

      validationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
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
                <FormInput
                  name="password"
                  label="Password"
                  type="Password"
                  placeholder="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                  isError={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <Button
                  type="submit"
                  className=" mt-6 w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ?? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? ' Password reset' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
