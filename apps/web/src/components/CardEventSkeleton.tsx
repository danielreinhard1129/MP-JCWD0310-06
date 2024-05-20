'use client';

import { Skeleton } from '@/components/ui/skeleton';

const CardEventSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="h-[175px] w-full rounded-lg" />
      <div className="flex flex-col gap-2 px-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
};

export default CardEventSkeleton;
