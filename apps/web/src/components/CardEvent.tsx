import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { FC } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

interface CardEventProps {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  thumbnail_url: string;
  eventId: number;
}

const CardEvent: FC<CardEventProps> = ({
  title,
  description,
  start_date,
  end_date,
  location,
  thumbnail_url,
  eventId,
}) => {
  return (
    <Link href={`/${eventId}`}>
      <Card className="overflow-hidden rounded-lg border-none pb-2 shadow-none hover:bg-neutral-100">
        <CardHeader className="relative h-[175px] w-full">
          <Image
            src={thumbnail_url}
            alt="thumbnail"
            fill
            className="h-[175px] rounded-lg object-cover"
          />
          <Badge className="absolute bottom-4 right-4 z-50">{location}</Badge>
        </CardHeader>
        <CardContent className="px-3">
          <h1 className="py-2 text-xl font-semibold">{title}</h1>
          <p className="text-black">
            {format(new Date(start_date), 'dd MMMM yyyy')} <span>-</span> {format(new Date(end_date), 'dd MMMM yyyy')}
          </p>
          <p className="line-clamp-2">
            {description}
          </p>
          <p className="pt-2 text-[16px] font-semibold text-black">
            From IDR <span>990.000</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardEvent;
