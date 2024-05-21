'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useClaimCoupon from '@/hooks/api/promo/useClaimCoupon';
import useClaimVoucher from '@/hooks/api/promo/useClaimVoucher';
import useCreateTransaction from '@/hooks/api/tx/useCreateTransaction';
import { useAppSelector } from '@/redux/hooks';
import { IFormTransaction } from '@/types/transaction.type';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface ModalOrderConfirmationProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  price: number;
  point: number;
}

const ModalOrderConfirmation: FC<ModalOrderConfirmationProps> = ({
  open,
  setOpen,
  price,
  point,
}) => {
  const pathname = usePathname();
  const { createTransaction } = useCreateTransaction();
  const { id } = useAppSelector((state) => state.user);
  const [numCount, setNumCount] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const { claimCoupon } = useClaimCoupon();
  const { claimVoucher } = useClaimVoucher();

  useEffect(() => {
    setFieldValue('qty', numCount);
  }, [numCount]);

  const plus = () => {
    setNumCount(numCount + 1);
  };
  const minus = () => {
    if (numCount > 1) {
      setNumCount(numCount - 1);
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    setFieldValue,
  } = useFormik<Omit<IFormTransaction, 'paymentProof'>>({
    initialValues: {
      qty: 1,
      isPointUse: false,
      isUseCoupon: false,
      isUseVoucher: false,
    },
    onSubmit: async (values, { setSubmitting }) => {
      const transactionData = {
        qty: values.qty,
        isPointUse: values.isPointUse,
        isUseCoupon: values.isUseCoupon,
        isUseVoucher: values.isUseVoucher,
      };

      await createTransaction({
        ...transactionData,
        userId: id,
        eventId: Number(pathname.slice(1)),
      });

      setSubmitting(false);
      setOpen(false);
    },
  });

  const finalPrice = values.isPointUse
    ? Math.max(price * numCount - point, 0)
    : price * numCount;

  const handleClaimCoupon = async () => {
    if (couponCode) {
      await claimCoupon({ code: couponCode, userId: id });
      setFieldValue('isUseCoupon', true);
    }
  };

  const handleClaimVoucher = async () => {
    if (voucherCode) {
      await claimVoucher({
        code: voucherCode,
        eventId: Number(pathname.slice(1)),
        userId: id
      });
      setFieldValue('isUseVoucher', true);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid w-full items-center gap-6">
                <div className="flex items-center justify-between">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={minus}
                      disabled={numCount === 1}
                      className="rounded-xl"
                    >
                      -
                    </Button>
                    <Input
                      name="qty"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setNumCount(Number(e.target.value));
                      }}
                      value={numCount}
                      className="w-[32px] text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={plus}
                      className="rounded-xl"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Point</Label>
                    <p className="text-sm">({point})</p>
                  </div>
                  {point > 0 ? (
                    <Switch
                      checked={values.isPointUse}
                      onCheckedChange={(checked) =>
                        setFieldValue('isPointUse', checked)
                      }
                    />
                  ) : (
                    <Switch disabled />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Label>Coupon Code</Label>
                  <Input
                    name="couponCode"
                    onBlur={handleBlur}
                    onChange={(e) => setCouponCode(e.target.value)}
                    value={couponCode}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClaimCoupon}
                  >
                    Claim Coupon
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Voucher Code</Label>
                  <Input
                    name="voucherCode"
                    onBlur={handleBlur}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    value={voucherCode}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClaimVoucher}
                  >
                    Claim Voucher
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Price</Label>
                  <div className="flex items-center gap-2">
                    {price === 0 ? (
                      <p className="pt-2 text-base font-semibold text-black">
                        Free
                      </p>
                    ) : (
                      <p className="pt-2 text-base font-semibold text-black">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumSignificantDigits: Math.trunc(
                            Math.abs(finalPrice),
                          ).toFixed().length,
                        }).format(finalPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Confirm Order</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalOrderConfirmation;
