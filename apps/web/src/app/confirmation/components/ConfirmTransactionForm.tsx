/* eslint-disable react/no-unescaped-entities */
'use client';

import Dropzone from '@/components/Dropzone';
import PreviewImages from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import { IFormTransaction } from '@/types/transaction.type';
import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface ConfirmTransactionFormProps {
  isLoading: boolean;
}
const ConfirmTransactionForm: FC<ConfirmTransactionFormProps> = ({
  isLoading,
}) => {
  const { handleSubmit, touched, errors, values, setFieldValue } =
    useFormikContext<IFormTransaction>();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 xl:gap-10">
        <h1 className="text-4xl font-bold">Upload your Payment proof</h1>

        {/* PREVIEW IMAGE */}
        {/* <PreviewImages
          fileImages={values.paymentProof}
          onRemoveImage={(idx: number) =>
            setFieldValue(
              'paymentProof',
              values.paymentProof?.toSpliced(idx, 1),
            )
          }
        /> */}
        <PreviewImages
          fileImages={values.paymentProof}
          onRemoveImage={(idx: number) =>
            setFieldValue(
              'paymentProof',
              values.paymentProof?.toSpliced(idx, 1),
            )
          }
        />

        {/* UPLOAD IMAGE */}

        <Dropzone
          isError={Boolean(errors.paymentProof)}
          label="Payment Proof"
          onDrop={(files) =>
            setFieldValue('paymentProof', [
              ...values.paymentProof,
              ...files.map((file) => file),
            ])
          }
        />

        {/* SUBMIT */}
        <div className="mb-4 flex justify-end">
          <Button
            type="submit"
            className=" mt-6 w-full text-white"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />:'Submit'}
            {/* {isLoading ? 'Email sent' : 'Submit'} */}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ConfirmTransactionForm;
