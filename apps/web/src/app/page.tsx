import { DatePicker } from '@/components/DatePicker';
import { LocationPicker } from '@/components/LocationPicker';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <main className="px-6 md:px-20">
      <div className="container relative my-6 flex-col px-0">
        {/* HERO POSTER */
        <div className="h-[374px] overflow-hidden rounded-3xl bg-[url('../../public/hero.jpg')] bg-cover bg-bottom">
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
        <div className="absolute -bottom-10 left-0 right-0 mx-auto flex w-4/5 overflow-hidden rounded-3xl border border-black/40 bg-white">
          <div className="flex w-full place-items-center px-6 py-4">
            <Search className="opacity-60" />
            <Input placeholder="Search" />
          </div>
          <div className="flex w-full place-items-center">
            <div className="w-full">
              <DatePicker className="w-full border-x-[1px]" />
            </div>
            <div className="w-full">
              <LocationPicker />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
