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
import { Filter } from 'lucide-react';
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthGuard(Page);
