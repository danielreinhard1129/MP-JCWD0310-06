'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FC, useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import useCreateTransaction from '@/hooks/api/tx/useCreateTransaction';
import { useAppSelector } from '@/redux/hooks';
import { useFormik } from 'formik';
import { IFormTransaction } from '@/types/transaction.type';

interface OrderCardProps {
  price: number;
  setOpen: (value: boolean) => void;
}

const OrderCard: FC<OrderCardProps> = ({ price, setOpen }) => {
  const pathname = usePathname();
  const { createTransaction } = useCreateTransaction();
  const { id } = useAppSelector((state) => state.user);
  const [numCount, setNumCount] = useState(1);

  useEffect(() => {
    setFieldValue('transactionDetail.qty', numCount);
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
    errors,
  } = useFormik<Omit<IFormTransaction, 'paymentProof'>>({
    initialValues: {
      qty: 0,
    },
    onSubmit: (values) => {
      // createTransaction({ ...values, userId: id, eventId: Number(pathname.slice(1)) });
      console.log(
        values,
        (values.userId = id),
        (values.eventId = Number(pathname.slice(1))),
      );
    },
  });

  return (
    <Card className="w-full rounded-2xl p-8 pt-3">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Order Details</AccordionTrigger>
                <AccordionContent className="space-y-4">
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
                        name="transactionDetail.qty"
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                              Math.abs(price),
                            ).toFixed().length,
                          }).format(price * numCount)}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              type="submit"
              onClick={() => setOpen(true)}
              className="w-full rounded-lg font-semibold"
            >
              Get Ticket
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
