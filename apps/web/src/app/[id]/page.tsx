'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { appConfig } from '@/utils/config';
import useGetEvent from '@/hooks/api/event/useGetEvent';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Globe, Instagram, MapPinned } from 'lucide-react';
import OrderCard from './components/OrderCard';
import CardEvent from '@/components/CardEvent';
import AuthGuardUser from '@/hoc/AuthGuardUser';

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const { event, isLoading } = useGetEvent(Number(params.id));

  if (isLoading) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  if (!event) {
    return notFound();
  }

  return (
    <main className="container px-0">
      <section className="relative my-6 h-[480px] w-full overflow-hidden rounded-3xl">
        <div className="absolute z-50 h-full w-full bg-gradient-to-r from-zinc-900/80 from-5% via-transparent to-zinc-900/80 to-95%"></div>
        <Image
          src={`${appConfig.baseUrl}/assets${event.thumbnail_url}`}
          alt="thumbnail"
          fill
          className="absolute bottom-0 top-0 z-10 my-auto object-cover"
        />
      </section>
      <section className="flex h-fit w-full justify-between">
        {/* LEFT SECTION */}
        <div className="flex w-3/5 flex-col gap-8">
          {/* TITLE AND DATE */}
          <div className="grid gap-2">
            <h2 className="text-xl font-medium text-[#767676]">
              {format(new Date(event.start_date), 'dd MMMM yyyy')}{' '}
              <span>-</span> {format(new Date(event.end_date), 'dd MMMM yyyy')}
            </h2>
            <h1 className="text-[40px] font-bold">{event.title}</h1>
          </div>
          {/* DESCRIPTION */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">
              About this Event
            </h2>
            <p className="text-justify">{event.description}</p>
          </div>
          {/* FEATURED ARTIST */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">Featured Artist</h2>
            <div className="flex items-center gap-4">
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                Armin Van Buuren
              </Badge>
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                DJ Snake
              </Badge>
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                Hardwell
              </Badge>
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                Martin Garrix
              </Badge>
              <p className="text-sm underline">see more</p>
            </div>
          </div>
          {/* GENRE */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">Genre</h2>
            <div className="flex items-center gap-4">
              <Badge className="w-fit rounded-full bg-[#f4f4f4] px-4 py-2">
                EDM
              </Badge>
            </div>
          </div>
          {/* LOCATION */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">Location</h2>
            <div className="flex items-center gap-4">
              <MapPinned />
              <div>
                <h3 className="font-medium">{event.location}</h3>
                <p className="text-xs text-[#767676]">{event.address}</p>
              </div>
            </div>
            {/* <Maps address={String(event.address)} /> */}
          </div>
          {/* ORGANIZED BY */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">Organizer</h2>
            <div className="flex justify-between rounded-md bg-[#f4f4f4] p-6">
              <div className="w-full">
                <h2 className="font-semibold">{event.user.fullName}</h2>
              </div>
              <div className="grid w-full gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <p>www.pestaporafest.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5" />
                  <p>@pestaporafest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="sticky top-6 h-fit w-[465px]">
          <OrderCard />
        </div>
      </section>
      <section className="grid gap-6 pt-10">
        <h2 className="text-[24px] font-semibold">
          More events you might like
        </h2>
        <div className="py-D4 grid grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <CardEvent
            title={event.title}
            description={event.description}
            eventId={event.id}
            location={event.location}
            thumbnail_url={appConfig.baseUrl + `/assets${event.thumbnail_url}`}
            start_date={new Date(event.start_date)}
            end_date={new Date(event.end_date)}
          />
        </div>
      </section>
    </main>
  );
};

export default AuthGuardUser(BlogDetail);
