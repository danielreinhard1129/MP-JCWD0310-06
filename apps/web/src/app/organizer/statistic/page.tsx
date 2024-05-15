'use client';

import LeftSection from '@/components/LeftSection';
import AuthGuard from '@/hoc/AuthGuard';
import ChartByMonth from './components/ChartByMonth';
import ChartByYear from './components/ChartByYear';

const page = () => {
  return (
    <main className="">
      <div className="">
        <h1 className="text-center text-4xl font-bold">Statistic</h1>
      </div>
      <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
        <LeftSection />
        <div className="col-span-4">
          <ChartByMonth />
          <ChartByYear />
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
