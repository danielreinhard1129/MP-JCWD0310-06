'use client';
import LeftSection from '@/components/LeftSection';
import Pagination from '@/components/Pagination';
import TableAttendees from '@/components/TableAttendees';

import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import useGetPendingTransactions from '@/hooks/api/tx/useGetPendingTransactions';
import { useAppSelector } from '@/redux/hooks';
import { TransactionStatus } from '@/types/transaction.type';
import { appConfig } from '@/utils/config';
import { useState } from 'react';

const AttendeesList = () => {
  const { id } = useAppSelector((state) => state.user);
  const [pagePending, setPagePending] = useState<number>(1);

  const { data: pendingTransactions, metaPending } = useGetPendingTransactions({
    id: id,
    page: pagePending,
    take: 10,
    status: TransactionStatus.COMPLETE,
  });
  const handleChangePendingPaginate = ({ selected }: { selected: number }) => {
    setPagePending(selected + 1);
  };
  return (
    <main className="container px-0">
      <div className="mx-auto flex flex-col gap-8 xl:gap-10">
        <h1 className="text-center text-4xl font-bold">Organizer Dashboard</h1>
      </div>
      <section className="grid w-full grid-cols-5 gap-4">
        {/* LEFT SECTION */}
        <div className="w-full">
          <LeftSection />
        </div>
        {/* RIGHT SECTION */}
        <div className="col-span-4">
          <div className="container px-0">
            <div className="container flex place-items-center justify-between px-0">
              <div className="relative w-fit">
                <h1 className="text-[24px] font-semibold">Attendees List</h1>
              </div>
            </div>
            <div className="">
              <Tabs defaultValue="account" className="w-full">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader className="">
                    <TableRow>
                      <TableHead className="">No.</TableHead>

                      <TableHead>Event Title</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  {pendingTransactions.map((transaction, key) => {
                    return (
                      <TableAttendees
                        no={key}
                        key={key}
                        invoice={transaction.invoice}
                        createdAt={new Date(transaction.createdAt)}
                        status={String(transaction.status)}
                        total={transaction.total}
                        transactionId={transaction.id}
                        userId={transaction.userId}
                        eventId={transaction.eventId}
                        eventTitle={transaction.event.title}
                        userName={transaction.user.fullName}
                        qty={transaction.qty}
                        paymentProof={
                          appConfig.baseUrl +
                          `/assets${transaction.paymentProof}`
                        }
                      />
                    );
                  })}
                </Table>
                <div className="mx-auto w-fit">
                  <Pagination
                    total={metaPending?.total || 0}
                    take={metaPending?.take || 0}
                    onChangePage={handleChangePendingPaginate}
                  />
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AttendeesList;
