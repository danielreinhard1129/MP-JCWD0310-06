'use client';

import LeftSection from '@/components/LeftSection';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AuthGuard from '@/hoc/AuthGuard';
import Link from 'next/link';

const page = () => {
  return (
    <main className="">
      <div className="">
        <h1 className="text-center text-4xl font-bold">Transaction</h1>
      </div>
      <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
        <LeftSection />
        <div className="col-span-4">
          <div className="container px-0">
            <div className="container flex place-items-center justify-between px-0 md:pt-10">
              <div className="relative w-fit">
                <h1 className="text-[24px] font-semibold">Your Events</h1>
              </div>
            </div>
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>dat</TableHead>
                    <TableHead className="">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell className="text-green-500">Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell className="text-red-500">
                      <Link href={''}>Unpaid</Link>
                    </TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>{' '}
        s
      </section>
    </main>
  );
};

export default AuthGuard(page);
