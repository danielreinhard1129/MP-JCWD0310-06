import CardEvent from '@/components/CardEvent';
import { DatePickerRange } from '@/components/DatePickerRange';
import { LocationPicker } from '@/components/LocationPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

export default function Home() {
  return (
    <main className="px-6 md:px-20">
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
        <div className="left-0 right-0 mx-auto w-full overflow-hidden rounded-xl md:rounded-3xl border border-black/40 bg-white px-6 py-2 md:absolute md:-bottom-10 md:flex md:w-4/5 md:p-6">
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
      <div className="container flex place-items-center justify-between px-0 md:pt-10">
        <div className="relative w-fit">
          <h1 className="text-[24px] font-semibold">Events in Jakarta</h1>
          <svg
            width="86"
            height="34"
            className="absolute right-0 top-0 -z-10 -rotate-12"
          >
            <rect width="100" height="100" fill="#FFD739" />
          </svg>
        </div>
        <Button
          variant="ghost"
          className="flex gap-2 rounded-none p-0 text-[#767676] hover:bg-inherit"
        >
          <h3 className="text-[16px] font-medium">Filters</h3>
          <Filter className="h-6 w-6" />
        </Button>
      </div>
      <div className="container grid grid-flow-col grid-cols-4 gap-6 p-0 pt-4">
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
      </div>
    </main>
  );
}
