'use client';

import LeftSection from '@/components/LeftSection';
import AuthGuard from '@/hoc/AuthGuard';

const page = () => {
  return (
    <main className="">
      <div className="">
        <h1 className="text-center text-4xl font-bold">Transaction</h1>
      </div>
      <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
        <LeftSection />
        <div className="col-span-4">mid</div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
