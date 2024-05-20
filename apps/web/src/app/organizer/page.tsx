/* eslint-disable react/no-unescaped-entities */
'use client';

import LeftSection from '@/components/LeftSection';
import AuthGuard from '@/hoc/AuthGuard';
import ChartByMonth from './components/chartByMonth/Chart2021';
import ChartByYear from './components/ChartByYear';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Chart2021 from './components/chartByMonth/Chart2021';
import Chart2022 from './components/chartByMonth/Chart2022';
import Chart2023 from './components/chartByMonth/Chart2023';
import Chart2024 from './components/chartByMonth/Chart2024';
import Chart2025 from './components/chartByMonth/Chart2025';

const page = () => {
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
                <h1 className="text-[24px] font-semibold">
                  Your Data Analytic
                </h1>
                {/* <div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div> */}
              </div>
            </div>
            <div className="w-full">
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="2021">2021</TabsTrigger>
                  <TabsTrigger value="2022">2022</TabsTrigger>
                  <TabsTrigger value="2023">2023</TabsTrigger>
                  <TabsTrigger value="2024">2024</TabsTrigger>
                  <TabsTrigger value="2025">2025</TabsTrigger>
                </TabsList>
                <TabsContent value="2021">
                  <Chart2021 />
                </TabsContent>
                <TabsContent value="2022">
                  <Chart2022 />
                </TabsContent>
                <TabsContent value="2023">
                  <Chart2023 />
                </TabsContent>
                <TabsContent value="2024">
                  <Chart2024 />
                </TabsContent>
                <TabsContent value="2025">
                  <Chart2025 />
                </TabsContent>
              </Tabs>
              <div className='mt-5'>
                <ChartByYear />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
