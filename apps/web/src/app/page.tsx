'use client';

import Autocomplete from '@/components/Autocomplete';
import CardEvent from '@/components/CardEvent';
import { LocationPicker } from '@/components/LocationPicker';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { appConfig } from '@/utils/config';
import { Filter } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import noeventfound from '../../public/noevent.png';
import { CategoryPicker } from '@/components/CategoryPicker';
import useGetEventsByFilter from '@/hooks/api/event/useGetEventsByFilter';
import CardEventSkeleton from '@/components/CardEventSkeleton';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [location, setLocation] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    data: events,
    meta,
    refetch,
  } = useGetEventsByFilter({
    page,
    take: 8,
    location,
    category,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  useEffect(() => {
    refetch().finally(() => setIsLoading(false));
  }, [location, category, page]);

  return (
    <main>
      <div className="px-6 md:px-20">
        <div className="container relative my-6 flex-col px-0">
          {/* HERO POSTER */}
          <div className="hidden h-[374px] overflow-hidden rounded-3xl bg-[url('../../public/hero.jpg')] bg-cover bg-bottom md:block">
            <div className="flex h-full w-full bg-black bg-opacity-30 px-10">
              <h1 className="my-auto text-[32px] font-medium text-white md:text-[48px]">
                Harmonize Your Experience:
                <br />
                Discover, Book, &{' '}
                <span className="text-main_yellow">Groove!</span>
              </h1>
            </div>
          </div>
          {/* SEARCH AND FILTER */}
          <div className="left-0 right-0 mx-auto w-full gap-10 overflow-visible rounded-xl border border-black/40 bg-white px-6 py-2 md:absolute md:-bottom-10 md:flex md:w-4/5 md:rounded-3xl md:p-6">
            <div className="flex w-full place-items-center">
              <Autocomplete />
            </div>
            <div className="place-items-centers mx-auto w-full md:flex">
              <Separator orientation="vertical" />
              <div className="w-full md:pl-4">
                <CategoryPicker onChange={handleCategoryChange} />
              </div>
              <Separator orientation="vertical" />
              <div className="w-full md:pl-4">
                <LocationPicker onChange={handleLocationChange} />
              </div>
            </div>
          </div>
        </div>
        {/* MAIN EVENTS LIST */}
        <div className="container px-0">
          <div className="container flex place-items-center justify-between px-0 md:pt-10">
            <div className="relative w-fit">
              <h1 className="text-[24px] font-semibold">
                Discover all{' '}
                <span className="relative">
                  <svg className="absolute right-0 top-0 -z-10 h-full w-full -rotate-6">
                    <rect width="10em" height="10em" fill="#FFD739" />
                  </svg>
                  Event
                </span>
              </h1>
            </div>
            <Button
              variant="ghost"
              className="flex gap-2 rounded-none p-0 text-[#767676] hover:bg-inherit"
            >
              <p className="text-[16px] font-medium">Filters</p>
              <Filter className="h-6 w-6" />
            </Button>
          </div>
          {isLoading ? (
            <div className='flex flex-col xl:flex-row w-full gap-4 pt-6'>
              <CardEventSkeleton />
              <CardEventSkeleton />
              <CardEventSkeleton />
              <CardEventSkeleton />
            </div>
          ) : (
            <div>
              {events.length === 0 ? (
                <div className="container mb-40 mt-10 flex flex-col items-center p-0">
                  <div className="flex w-full justify-center">
                    <Image
                      src={noeventfound}
                      alt="no event found"
                      height={400}
                      className="object-contain opacity-50"
                      draggable="false"
                    />
                  </div>
                  <p className="text-md -mt-16 mb-10 font-medium text-neutral-300 xl:text-xl">
                    Sorry, we can't find any event for you
                  </p>
                </div>
              ) : (
                <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {events.map((event, index) => {
                    return (
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
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <div className="mx-auto w-fit">
            <Pagination
              total={meta?.total || 0}
              take={meta?.take || 0}
              onChangePage={handleChangePaginate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
