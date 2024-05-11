'use client';
import Image from 'next/image';
import thumbnail from '../../../public/samplecardimg.jpg';
import { Badge } from '@/components/ui/badge';
import { Globe, Instagram, MapPinned } from 'lucide-react';
import Maps from '@/components/Maps';
import CardEvent from '@/components/CardEvent';
import OrderCard from './components/OrderCard';
import AuthGuard from '@/hoc/AuthGuard';
import AuthGuardUser from '@/hoc/AuthGuardUser';

const CardDetail = () => {
  const address =
    'Jalan Benyamin Suaeb, RT.13/RW.7, Gunung Sahari Utara, Jakarta Utara, Daerah Khusus Ibukota Jakarta, Indonesia';

  return (
    <main className="container px-0">
      <section className="relative my-6 h-[480px] w-full overflow-hidden rounded-3xl">
        <div className="absolute z-50 h-full w-full bg-gradient-to-r from-zinc-900/80 from-5% via-transparent to-zinc-900/80 to-95%"></div>
        <Image
          src={thumbnail}
          alt="thumbnail"
          objectFit="fill"
          className="absolute bottom-0 top-0 z-10 my-auto"
        />
      </section>
      <section className="flex h-fit w-full justify-between">
        {/* LEFT SECTION */}
        <div className="flex w-3/5 flex-col gap-8">
          {/* TITLE AND DATE */}
          <div className="grid gap-2">
            <h2 className="text-xl font-medium text-[#767676]">
              Thursday, April 5 <span>-</span> 7:00 PM
            </h2>
            <h1 className="text-[40px] font-bold">Pestapora Music Fest</h1>
          </div>
          {/* DESCRIPTION */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">
              About this Event
            </h2>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
              aliquam urna, et rhoncus elit. Curabitur dapibus sit amet mi quis
              rhoncus. Cras non dui velit. Praesent finibus, lorem nec
              ullamcorper tincidunt, erat urna sollicitudin ante, ut pulvinar ex
              neque in lectus. Cras pharetra quis turpis nec dapibus. Aliquam
              sit amet libero nec lorem iaculis commodo. Etiam blandit justo
              pulvinar sodales ullamcorper. Proin a tempor turpis. Suspendisse
              fermentum nisl a lacus aliquet imperdiet. Integer et cursus
              turpis. Nunc tempus varius metus. Ut dictum feugiat purus, at
              tincidunt ante lobortis at. Aenean ultrices quam justo, aliquet
              sodales elit sollicitudin a. Pellentesque diam massa, suscipit ac
              tempus et, viverra nec tellus. Nulla eu tellus pharetra, ultrices
              quam ut, pharetra leo. Mauris sit amet dui odio. Sed venenatis est
              consequat dui fermentum suscipit. Etiam convallis quam neque,
              blandit viverra velit placerat auctor. Phasellus blandit nibh
              sagittis tellus efficitur, eget lacinia quam pellentesque. Fusce
              viverra posuere neque, eget ullamcorper eros sollicitudin non.
              Fusce vestibulum nec quam at dignissim. Maecenas faucibus lacus in
              rhoncus dictum. Etiam congue, eros sed lobortis egestas, sapien
              enim molestie libero, vel venenatis turpis quam vel ligula.
              Pellentesque et neque sed urna semper luctus.
            </p>
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
            <h2 className="text-2xl font-medium text-black">Featured Artist</h2>
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
                <h3 className="font-medium">Jakarta International Expo</h3>
                <p className="text-xs text-[#767676]">{address}</p>
              </div>
            </div>
            <Maps address={address} />
          </div>
          {/* ORGANIZED BY */}
          <div className="grid gap-4">
            <h2 className="text-2xl font-medium text-black">Location</h2>
            <div className="flex justify-between rounded-md bg-[#f4f4f4] p-6">
              <div className="w-full">
                <h2 className="font-semibold">Ismaya Live</h2>
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
          <CardEvent />
          <CardEvent />
          <CardEvent />
          <CardEvent />
        </div>
      </section>
    </main>
  );
};

export default AuthGuardUser(CardDetail);
