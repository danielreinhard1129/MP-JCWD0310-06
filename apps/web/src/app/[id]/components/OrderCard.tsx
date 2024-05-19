'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FC, useState, useEffect } from 'react';

interface OrderCardProps {
  price: number;
  setOpen: (value: boolean) => void;
}

const OrderCard: FC<OrderCardProps> = ({ price, setOpen }) => {
  return (
    <Card className="w-full rounded-none xl:rounded-2xl p-4 xl:p-8">
      <CardContent className="flex flex-row gap-0 xl:gap-4 xl:flex-col">
        <div className="flex flex-col items-start xl:items-center w-full justify-start xl:flex-row xl:justify-between">
          <Label className="text-xs xl:text-base">Price</Label>
          <div className="flex items-center gap-2">
            {price === 0 ? (
              <p className="text-base font-semibold text-black">Free</p>
            ) : (
              <p className="text-base font-semibold text-black">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumSignificantDigits: Math.trunc(
                    Math.abs(price),
                  ).toFixed().length,
                }).format(price)}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="w-full rounded-lg font-semibold"
        >
          Get Ticket
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
