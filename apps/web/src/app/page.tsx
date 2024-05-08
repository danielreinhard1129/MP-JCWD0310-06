import CardEvent from '@/components/CardEvent';
import { DatePickerRange } from '@/components/DatePickerRange';
import { LocationPicker } from '@/components/LocationPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthGuard from '@/hoc/AuthGuard';
import { Filter, Search } from 'lucide-react';
import { homedir } from 'os';

export default function Home() {
  return (
    <>
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
          <div className="left-0 right-0 mx-auto w-full overflow-hidden rounded-xl border border-black/40 bg-white px-6 py-2 md:absolute md:-bottom-10 md:flex md:w-4/5 md:rounded-3xl md:p-6">
            <div className="flex w-full place-items-center">
              <Search className="mr-2 h-4 w-4 opacity-60" />
              <Input placeholder="Search" />
            </div>
            <div className="place-items-centers w-full md:flex">
              <div className="w-full">
                <DatePickerRange className="w-full md:border-x-[1px] md:pl-4" />
              </div>
              <div className="w-full md:pl-4">
                <LocationPicker />
              </div>
            </div>
          </div>
        </div>
        {/* MAIN EVENTS LIST */}
        <div className="container px-0">
          <div className="container flex place-items-center justify-between px-0 md:pt-10">
            <div className="relative w-fit">
              <h1 className="text-[24px] font-semibold">
                Events in{' '}
                <span className="relative">
                  <svg className="absolute right-0 top-0 -z-10 h-full w-full -rotate-6">
                    <rect width="10em" height="10em" fill="#FFD739" />
                  </svg>
                  Jakarta
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
          <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
          </div>
          <div className="flex w-full place-items-center">
            <Button variant="secondary" className="mx-auto rounded-md px-16">
              Show More
            </Button>
          </div>
        </div>
        {/* MORE EVENTS LIST */}
        <div className="container px-0">
          <div className="container flex place-items-center justify-between px-0 md:pt-10">
            <p className="text-[24px] font-semibold">
              More events you might like
            </p>
          </div>
          <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CardEvent />
            <CardEvent />
            <CardEvent />
            <CardEvent />
          </div>
        </div>
      </div>
    </>
  );
}
