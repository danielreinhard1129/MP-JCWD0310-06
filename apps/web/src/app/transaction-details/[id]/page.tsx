'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useGetEvent from '@/hooks/api/event/useGetEvent';
import useGetTransaction from '@/hooks/api/tx/useGetTransaction';
import { format } from 'date-fns';
import Countdown from 'react-countdown';

const TransactionDetails = ({ params }: { params: { id: string } }) => {
  // const {event} = useGetEvent(id);
  const { transaction } = useGetTransaction(Number(params.id));

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const trxStatus = transaction.status;

  let statusClass = '';
  if (trxStatus === 'CANCELLED') {
    statusClass = 'bg-red-400';
  } else if (trxStatus === 'COMPLETE') {
    statusClass = 'bg-green-600';
  } else {
    statusClass = 'bg-black';
  }

  return (
    <main className="container mt-10 flex flex-col items-center p-0">
      <Card className="flex w-[480px] flex-col items-start gap-2 rounded-none border-none shadow-none">
        <CardHeader
          className={`relative flex h-[120px] w-full flex-col items-center justify-center rounded-lg p-6 ${statusClass}`}
        >
          {trxStatus === 'PENDING' ? (
            <Countdown
              className="text-white"
              date={
                new Date(transaction.createdAt).getTime() + 2 * 60 * 60 * 1000
              }
            />
          ) : (
            <div className="hidden"></div>
          )}
          <h1 className="font-bold text-white">
            Your order is {trxStatus.charAt(0)}
            {trxStatus.slice(1).toLowerCase()}
          </h1>
          <svg className="absolute -bottom-6 -right-5 h-10 w-10 rounded-full bg-white"></svg>
          <svg className="absolute -bottom-6 -left-5 h-10 w-10 rounded-full bg-white"></svg>
        </CardHeader>
        {/* TRX DETAILS */}
        <CardContent className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100/60 p-6">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Invoice ID</p>
            <p className="w-full text-end text-sm font-semibold text-black/70">
              {transaction.invoice}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Event title</p>
            <p className="line-clamp-2 w-full text-end text-sm font-semibold text-black/70">
              {transaction.event.title}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Issue date</p>
            <p className="w-full text-end text-sm font-semibold text-black/70">
              {format(new Date(transaction.createdAt), 'dd MMMM yyyy hh:mm')}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Ordered by</p>
            <p className="line-clamp-2 w-full text-end text-sm font-semibold text-black/70">
              {transaction.user.fullName}
            </p>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Quantity</p>
            <p className="w-full text-end text-sm font-semibold text-black/70">
              {transaction.qty}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Total</p>
            <p className="line-clamp-2 w-full text-end">
              {transaction.total === 0 ? (
                <p className="text-sm font-semibold text-black/70">Free</p>
              ) : (
                <p className="text-sm font-semibold text-black/70">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumSignificantDigits: Math.trunc(
                      Math.abs(transaction.total),
                    ).toFixed().length,
                  }).format(transaction.total)}
                </p>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default TransactionDetails;
