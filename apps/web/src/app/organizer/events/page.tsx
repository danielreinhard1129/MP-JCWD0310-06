/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import CardEvent from '@/components/CardEvent';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import { BadgePlus, Filter } from 'lucide-react';

import LeftSection from '@/components/LeftSection';
import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';
import Autocomplete from '@/components/Autocomplete';

const page = () => {
  const { id } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const { data: events, meta } = useGetEventsByOrganizer({
    id: id,
    page,
    take: 9,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  const router = useRouter();

  // console.log(event.length);

  return (
    <main className="">
      <div className="">
        <h1 className="text-center text-4xl font-bold">Organizer Dashboard</h1>
      </div>
      <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
        <LeftSection />
        <div className="col-span-4">
          <div className="container px-0">
            <div className="container flex place-items-center justify-between px-0">
              <div className="relative w-fit">
                <h1 className="text-[24px] font-semibold">Your Events</h1>
              </div>
            </div>
            <div className="flex w-full place-items-center justify-between rounded-xl">
              <Autocomplete />
              <Button
                variant="ghost"
                className="flex gap-2 rounded-none p-0 text-[#767676] hover:bg-inherit"
                onClick={() => {
                  router.push('/create');
                }}
              >
                <p className="text-[16px] font-medium">Create Event</p>
                <BadgePlus className="h-6 w-6" />
              </Button>
            </div>
            <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event, index) => {
                return (
                  <CardEvent
                    key={index}
                    title={event.title}
                    description={event.description}
                    start_date={new Date()}
                    end_date={new Date()}
                    location={event.location}
                    thumbnail_url={
                      appConfig.baseUrl + `/assets${event.thumbnail_url}`
                    }
                    eventId={event.id}
                    price={event.price}
                  />
                );
              })}
            </div>
            <div className="mx-auto w-fit">
              <Pagination
                total={meta?.total || 0}
                take={meta?.take || 0}
                onChangePage={handleChangePaginate}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
