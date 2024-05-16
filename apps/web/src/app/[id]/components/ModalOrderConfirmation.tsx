'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FC } from 'react';

interface ModalOrderConfirmationProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onTransactionDetails: () => void;
}

const ModalOrderConfirmation: FC<ModalOrderConfirmationProps> = ({
  open,
  setOpen,
  onTransactionDetails,
}) => {

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Order Confimation</AlertDialogTitle>
          <AlertDialogDescription>
            <div></div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onTransactionDetails}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalOrderConfirmation;
