'use client';

import { HTMLInputTypeAttribute } from 'react';
import { FormikErrors, FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string | number | Date;
  isError: boolean;
  label: string;
  error: string | FormikErrors<Date> | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  type,
  onChange,
  onBlur,
  value,
  label,
  isError,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={placeholder} className={isError ? 'text-red-500' : ''}>
        {placeholder}
      </Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={
          typeof value === 'string' || typeof value === 'number'
            ? value
            : value.toISOString()
        }
        className="rounded-md border"
      />
      {isError ? (
        <div className="text-xs text-red-500">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
