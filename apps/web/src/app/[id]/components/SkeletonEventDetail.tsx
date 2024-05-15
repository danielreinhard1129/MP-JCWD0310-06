'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SkeletonEventDetail = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[200px] xl:h-[480px] w-full rounded-xl xl:rounded-3xl my-6" />
      <div className="space-y-2 pt-10">
        <Skeleton className="h-4 max-w-[250px]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="space-y-2 pt-10">
        <Skeleton className="h-4 max-w-[250px]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
};

export default SkeletonEventDetail;
