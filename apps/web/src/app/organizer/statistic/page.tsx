'use client';

import {
  BarChart3,
  Filter,
  HomeIcon,
  ReceiptText,
  UserRound,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import LeftSection from '@/components/LeftSection';
import AuthGuard from '@/hoc/AuthGuard';
import ChartByMonth from './components/ChartByMonth';
import ChartByYear from './components/ChartByYear';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <main className="flex w-full flex-col items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-4xl font-bold">Statistic</h1>
        <div className="w-full md:hidden">
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
          <ChartByMonth />
          <ChartByYear />
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(Page);
