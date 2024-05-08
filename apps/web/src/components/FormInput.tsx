'use client';

import { HTMLInputTypeAttribute } from 'react';
import { FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  label: string;
  error: string | undefined;
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
        value={value}
        className="rounded-md border"
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormInput;
