// 'use client';

// import CardEvent from '@/components/CardEvent';
// import { Button } from '@/components/ui/button';
// import AuthGuard from '@/hoc/AuthGuard';
// import useGetEvents from '@/hooks/api/event/useGetEventsByOrganizer';
// import { Filter } from 'lucide-react';
// import LeftSection from '../../components/LeftSection';
// import { useAppSelector } from '@/redux/hooks';
// import { appConfig } from '@/utils/config';
// import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';

// const page = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { id } = useAppSelector((state) => state.user);
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { data: event } = useGetEventsByOrganizer(id);
//   // console.log(event.length);

//   return (
//     <main className="">
//       <div className="">
//         <h1 className="text-center text-4xl font-bold">Organizer Dashboard</h1>
//       </div>
//       <section className="grid w-full grid-cols-5 px-6 md:px-20 ">
//         <LeftSection />
//         <div className="col-span-4">
//           <div className="container px-0">
//             <div className="container flex place-items-center justify-between px-0 md:pt-10">
//               <div className="relative w-fit">
//                 <h1 className="text-[24px] font-semibold">Your Events</h1>
//               </div>
//               <Button
//                 variant="ghost"
//                 className="flex gap-2 rounded-none p-0 text-[#767676] hover:bg-inherit"
//               >
//                 <p className="text-[16px] font-medium">Filters</p>
//                 <Filter className="h-6 w-6" />
//               </Button>
//             </div>
//             <div className="container grid grid-cols-1 gap-6 p-0 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {event.map((event, index) => {
//                 return (
//                   <CardEvent
//                     key={index}
//                     title={event.title}
//                     description={event.description}
//                     start_date={new Date()}
//                     end_date={new Date()}
//                     location={event.location}
//                     thumbnail_url={
//                       appConfig.baseUrl + `/assets${event.thumbnail_url}`
//                     }
//                     eventId={event.id}
//                     price={event.price}
//                   />
//                 );
//               })}
//             </div>
//             <div className="flex w-full place-items-center">
//               <Button variant="secondary" className="mx-auto rounded-md px-16">
//                 Show More
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AuthGuard(page);
'use client';

import CardEvent from '@/components/CardEvent';
import LeftSection from '@/components/LeftSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/hoc/AuthGuard';
import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import {
  BarChart3,
  Filter,
  HomeIcon,
  ReceiptText,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { id } = useAppSelector((state) => state.user);
  const { data: events } = useGetEventsByOrganizer(id);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-4xl font-bold">Organizer Dashboard</h1>
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Menu</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer')}
                >
                  <HomeIcon className="mr-4 h-5 w-5" /> Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/profile')}
                >
                  <UserRound className="mr-4 h-5 w-5" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/transaction')}
                >
                  <ReceiptText className="mr-4 h-5 w-5" /> Transaction
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-left"
                  onClick={() => router.push('/organizer/statistic')}
                >
                  <BarChart3 className="mr-4 h-5 w-5" /> Statistic
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <section className="flex w-full flex-col px-4 md:px-20 lg:flex-row">
        <LeftSection />
        <div className="w-full lg:w-4/5">
          <div className="container px-0">
            <div className="flex flex-col py-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-semibold">Your Events</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 p-0 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events?.map((event, index) => (
                <CardEvent
                  key={index}
                  title={event.title}
                  description={event.description}
                  start_date={new Date(event.start_date)}
                  end_date={new Date(event.end_date)}
                  location={event.location}
                  thumbnail_url={`${appConfig.baseUrl}/assets${event.thumbnail_url}`}
                  eventId={event.id}
                  price={event.price}
                />
              ))}
            </div>
            <div className="mt-4 flex w-full justify-center">
              <Button variant="secondary" className="rounded-md px-8 py-2">
                Show More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(Page);
