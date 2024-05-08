'use client';

import { FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface FormInputProps {
  name: string;
  placeholder: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  error: string | undefined;
}

const FormTextArea: React.FC<FormInputProps> = ({
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  isError,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={placeholder} className={isError ? 'text-red-500' : ''}>
        {placeholder}
      </Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{ resize: 'none' }}
        rows={8}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormTextArea;
