// 'use client';

// import LeftSection from '@/components/LeftSection';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import AuthGuard from '@/hoc/AuthGuard';
// import Link from 'next/link';

// const page = () => {
//   return (
//     <main className="">
//       <div className="">
//         <h1 className="text-center text-4xl font-bold">Transaction</h1>
//       </div>
//       <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
//         <LeftSection />
//         <div className="col-span-4">
//           <div className="container px-0">
//             <div className="container flex place-items-center justify-between px-0 md:pt-10">
//               <div className="relative w-fit">
//                 <h1 className="text-[24px] font-semibold">Your Events</h1>
//               </div>
//             </div>
//             <div>
//               <Table>
//                 <TableCaption>A list of your recent invoices.</TableCaption>
//                 <TableHeader className="">
//                   <TableRow>
//                     <TableHead className="">Invoice</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>dat</TableHead>
//                     <TableHead className="">Amount</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">INV001</TableCell>
//                     <TableCell className="text-green-500">Paid</TableCell>
//                     <TableCell>Credit Card</TableCell>
//                     <TableCell className="">$250.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">INV002</TableCell>
//                     <TableCell className="text-red-500">
//                       <Link href={''}>Unpaid</Link>
//                     </TableCell>
//                     <TableCell>Credit Card</TableCell>
//                     <TableCell className="">$250.00</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         </div>{' '}
//         s
//       </section>
//     </main>
//   );
// };

// export default AuthGuard(page);

'use client';

import LeftSection from '@/components/LeftSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
import { BarChart3, HomeIcon, ReceiptText, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-4xl font-bold">Transaction</h1>
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Menu</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer')}
                >
                  <HomeIcon className="mr-4 h-5 w-5" /> Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/profile')}
                >
                  <UserRound className="mr-4 h-5 w-5" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/transaction')}
                >
                  <ReceiptText className="mr-4 h-5 w-5" /> Transaction
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/statistic')}
                >
                  <BarChart3 className="mr-4 h-5 w-5" /> Statistic
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <section className="flex w-full flex-col px-4 md:px-20 lg:flex-row">
        <LeftSection />
        <div className="mt-4 w-full lg:mt-0 lg:w-4/5">
          <div className="container px-0">
            <div className="flex flex-col py-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-semibold">Your Events</h1>
            </div>
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell className="text-green-500">Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell className="text-red-500">
                      <Link href={''}>Unpaid</Link>
                    </TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(Page);
