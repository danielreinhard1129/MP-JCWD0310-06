'use client';

import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { getChangedValues } from '@/utils/getChangedValues';
import UploadPaymentProofForm from './components/ConfirmTransactionForm';
import useConfirmTransaction from '@/hooks/api/tx/useConfirmTransaction';
import { useSearchParams } from 'next/navigation';

const Confirm = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const { isLoading, confirmTransaction } = useConfirmTransaction(Number(search));

  const initialValues = {
    paymentProof: [],
  };

  return (
    <main>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = getChangedValues(values, initialValues);
          if (!payload.paymentProof?.length) {
            delete payload.paymentProof;
          }
          confirmTransaction(payload);
        }}
        enableReinitialize
        validationSchema={validationSchema}
      >
        <UploadPaymentProofForm isLoading={isLoading} />
      </Formik>
    </main>
  );
};

export default Confirm;
