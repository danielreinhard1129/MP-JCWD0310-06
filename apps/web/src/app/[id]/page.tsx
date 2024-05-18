'use client';

import useGetEvent from '@/hooks/api/event/useGetEvent';
import { appConfig } from '@/utils/config';
import { format } from 'date-fns';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPinned } from 'lucide-react';
import OrderCard from './components/OrderCard';
import CardEvent from '@/components/CardEvent';
import SkeletonEventDetail from './components/SkeletonEventDetail';
import { useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ModalOrderConfirmation from './components/ModalOrderConfirmation';
import useGetEvents from '@/hooks/api/event/useGetEvents';
import AuthGuardEvents from '@/hoc/AuthGuardEvents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EventDetail = ({ params }: { params: { id: string } }) => {
  const { id, role } = useAppSelector((state) => state.user);
  const { event, isLoading } = useGetEvent(Number(params.id));
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: events } = useGetEvents({
    page,
    take: 4,
  });
  const [open, setOpen] = useState(false);
  const excludedEvent = event?.id;
  const filteredEvent = events.filter((event) => event.id !== excludedEvent);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SkeletonEventDetail />
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  return (
    <main className="container px-4 xl:px-0">
      <section className="relative my-6 h-[200px] w-full overflow-hidden rounded-xl xl:h-[560px] xl:rounded-3xl">
        <div className="absolute z-50 h-full w-full"></div>
        <Image
          src={`${appConfig.baseUrl}/assets${event.thumbnail_url}`}
          alt="thumbnail"
          fill
          className="absolute bottom-0 top-0 z-10 my-auto object-cover"
        />
      </section>
      <section className="flex h-fit w-full flex-col justify-between gap-4 xl:flex-row xl:gap-0">
        {/* LEFT SECTION */}
        <div className="flex w-full flex-col gap-3 xl:w-3/5 xl:gap-8">
          {/* TITLE AND DATE */}
          <div className="grid gap-2">
            <h2 className="text-sm font-medium text-[#767676] xl:text-xl">
              {format(new Date(event.start_date), 'dd MMMM yyyy')}{' '}
              <span>-</span> {format(new Date(event.end_date), 'dd MMMM yyyy')}
            </h2>
            <h1 className="break-words text-xl font-bold xl:text-4xl">
              {event.title}
            </h1>
          </div>
          {/* DESCRIPTION */}
          <div className="  grid gap-1 xl:gap-4">
            <h2 className="text-base font-medium text-black xl:text-2xl">
              About this Event
            </h2>
            <p className="break-words text-justify text-sm xl:text-base">
              {event.description}
            </p>
          </div>
          {/* GENRE */}
          <div className="grid gap-4">
            <h2 className="text-base font-medium text-black xl:text-2xl">
              Genre
            </h2>
            <div className="flex items-center gap-4">
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                {event.category}
              </Badge>
            </div>
          </div>
          {/* LOCATION */}
          <div className="grid gap-4">
            <h2 className="text-base font-medium text-black xl:text-2xl">
              Location
            </h2>
            <div className="flex items-center gap-4 text-sm xl:text-base">
              <MapPinned />
              <div>
                <h3 className="font-medium">{event.location}</h3>
                <p className="text-xs text-[#767676]">{event.address}</p>
              </div>
            </div>
            {/* <Maps address={String(event.address)} /> */}
          </div>
          {/* ORGANIZED BY */}
          <div className="grid w-fit gap-4">
            <h2 className="text-base font-medium text-black xl:text-2xl">
              Organizer
            </h2>
            <div className="flex justify-between rounded-md bg-[#f4f4f4] px-6 py-4">
              <div className="flex w-full items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="useravatar"
                  />
                  <AvatarFallback>
                    {event.user.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{event.user.fullName}</h2>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="fixed bottom-5 left-0 right-0 z-50 mx-auto flex h-fit w-[92.5%] flex-col gap-4 xl:sticky xl:top-6 xl:mx-0 xl:w-[465px]">
          {role === 'user' ? (
            <div className="flex items-center gap-4">
              <OrderCard price={event.price} setOpen={() => setOpen(true)} />
            </div>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/${params.id}/update`)}
              className="rounded-full"
            >
              <Edit size="20px" />
            </Button>
          )}
        </div>
      </section>
      <section className="grid gap-6 pt-10">
        <h2 className="text-[24px] font-semibold">
          More events you might like
        </h2>
        <div className="py-D4 grid grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvent.map((event, index) => (
            <CardEvent
              key={index}
              title={event.title}
              description={event.description}
              eventId={event.id}
              location={event.location}
              start_date={event.start_date}
              end_date={event.end_date}
              price={event.price}
              thumbnail_url={
                appConfig.baseUrl + `/assets${event.thumbnail_url}`
              }
            />
          ))}
        </div>
      </section>
      <ModalOrderConfirmation
        open={open}
        setOpen={setOpen}
        onTransactionDetails={() =>
          router.push(`/${event.id}/transaction-details`)
        }
      />
    </main>
  );
};

export default AuthGuardEvents(EventDetail);
