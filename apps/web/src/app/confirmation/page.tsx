'use client';

import { Formik } from 'formik';
import { validationSchema } from './validationSchema';

import UseConfirmTransaction from '@/hooks/api/tx/UseConfirmTransaction';
import { getChangedValues } from '@/utils/getChangedValues';
import { useSearchParams } from 'next/navigation';
import UploadPaymentProofForm from './components/ConfirmTransactionForm';

const Confirm = () => {
  // const { id } = useAppSelector((state) => state.user);
  const searchParam = useSearchParams();
  const id = searchParam.get('id');

  const { isLoading, confirmTransaction } = UseConfirmTransaction(Number(id));

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
// function useUpdate(arg0: number): { isLoading: any; updateEvent: any } {
//   throw new Error('Function not implemented.');
// }
