/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import LeftSection from '@/components/LeftSection';
import Pagination from '@/components/Pagination';
import TableTransactions from '@/components/TableTransactions';
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthGuard from '@/hoc/AuthGuard';
import useGetTransactions from '@/hooks/api/tx/useGetTransactions';
import { useAppSelector } from '@/redux/hooks';
import { TransactionStatus } from '@/types/transaction.type';
import { useState } from 'react';

const page = () => {
  const { id } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const { data: transactions, meta } = useGetTransactions({
    id: id,
    page,
    take: 5,
    status: TransactionStatus.PENDING,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
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
                <h1 className="text-[24px] font-semibold">Your Transaction</h1>
              </div>
            </div>
            <div className="">
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="pending">Nedd approval</TabsTrigger>
                  <TabsTrigger value="history">Transaction List</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="history" className="">
                  {/*TABLE*/}
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="">
                      <TableRow>
                        <TableHead className="">Invoice</TableHead>
                        <TableHead>Event Title</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    {transactions.map((transaction, key) => {
                      return (
                        <TableTransactions
                          key={key}
                          invoice={transaction.invoice}
                          createdAt={new Date()}
                          status={String(transaction.status)}
                          total={transaction.total}
                          transactionId={transaction.id}
                          userId={transaction.userId}
                          eventId={transaction.eventId}
                          eventTitle={transaction.event.title}
                          userName={transaction.user.fullName}
                          qty={transaction.qty}
                        />
                      );
                    })}
                  </Table>
                  <div className="mx-auto w-fit">
                    <Pagination
                      total={meta?.total || 0}
                      take={meta?.take || 0}
                      onChangePage={handleChangePaginate}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
