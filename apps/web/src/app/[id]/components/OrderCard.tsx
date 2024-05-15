'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
  price: number;
  setOpen: (value: boolean) => void;
}

const OrderCard: FC<OrderCardProps> = ({ price, setOpen }) => {
  const router = useRouter();
  const [numCount, setNumCount] = useState(1);

  const plus = () => {
    setNumCount(numCount + 1);
  };
  const minus = () => {
    if (numCount > 1) {
      setNumCount(numCount - 1);
    }
  };
  return (
    <Card className="w-full rounded-2xl p-8 pt-3">
      <CardContent>
        {/* <form> */}
        <div className="grid w-full items-center gap-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Order Details</AccordionTrigger>
              <AccordionContent className='space-y-4'>
                <div className="flex items-center justify-between">
                  <Label>Quantity</Label>
                  <div className="flex place-items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={minus}
                      disabled={numCount === 1}
                      className="rounded-xl"
                    >
                      -
                    </Button>
                    <div>{numCount}</div>
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
                    <p className="pt-2 text-[16px] font-semibold text-black">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumSignificantDigits: Math.trunc(
                          Math.abs(price),
                        ).toFixed().length,
                      }).format(price * numCount)}
                    </p>
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
        {/* </form> */}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
