// 'use client';
// import { Button } from '@/components/ui/button';
// import { BarChart3, HomeIcon, ReceiptText, UserRound } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const LeftSection = () => {
//   const router = useRouter();
//   return (
//     <div>
//       <div className=" flex flex-col">
//         <Button
//           variant="ghost"
//           className="justify-normal"
//           onClick={() => router.push('/organizer')}
//         >
//           <HomeIcon className="mr-4 h-4 w-4" /> Home
//         </Button>
//         <Button variant="ghost" className="justify-normal">
//           <UserRound className="mr-4 h-4 w-4" /> Profile
//         </Button>
//         <Button
//           variant="ghost"
//           className="justify-normal"
//           onClick={() => router.push('/organizer/transaction')}
//         >
//           <ReceiptText className="mr-4 h-4 w-4" />
//           Transaction
//         </Button>
//         <Button variant="ghost" className="justify-normal"onClick={() => router.push('/organizer/statistic')}>
//           <BarChart3 className="mr-4 h-4 w-4" /> Statistic
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LeftSection;

'use client';
import { Button } from '@/components/ui/button';
import { BarChart3, HomeIcon, ReceiptText, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LeftSection = () => {
  const router = useRouter();
  return (
    <div className="hidden w-full p-4 md:block lg:w-1/5 lg:p-0">
      <div className="flex flex-col space-y-2">
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
      </div>
    </div>
  );
};

export default LeftSection;
