'use client';

import CardEvent from '@/components/CardEvent';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import { Filter } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';

const page = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data: event } = useGetEventsByOrganizer(id);

  return (
    <main className="container px-0">
      <div className="mx-auto flex flex-col gap-8 xl:gap-10">
        <h1 className="text-4xl font-bold">Organizer Dashboard</h1>
      </div>
      <section className="grid w-full grid-cols-5 gap-4">
        {/* LEFT SECTION */}
        <div className="w-full">
          
        </div>
        {/* RIGHT SECTION */}
        <div className="col-span-4">
          <div className="container px-0">
            <div className="container flex place-items-center justify-between px-0">
              <div className="relative w-fit">
                <h1 className="text-[24px] font-semibold">Your Events</h1>
              </div>
              <Button
                variant="ghost"
                className="flex gap-2 rounded-none p-0 text-[#767676] hover:bg-inherit"
              >
                <Filter className="h-6 w-6" />
              </Button>
            </div>
            <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {event.map((event, index) => {
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(page);
