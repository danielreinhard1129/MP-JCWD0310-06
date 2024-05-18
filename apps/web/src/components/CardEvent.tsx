import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';

interface CardEventProps {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  thumbnail_url: string;
  eventId: number;
  price: number;
}

const CardEvent: FC<CardEventProps> = ({
  title,
  description,
  start_date,
  end_date,
  location,
  thumbnail_url,
  eventId,
  price,
}) => {
  return (
    <Link href={`/${eventId}`}>
      <Card className="group overflow-hidden rounded-lg border-none p-3 shadow-none hover:bg-neutral-100/60">
        <CardHeader className="relative h-[175px] w-full overflow-hidden rounded-lg">
          <Image
            src={thumbnail_url}
            alt="thumbnail"
            fill
            className="rounded-lg object-cover group-hover:scale-110 group-hover:transition-all group-hover:duration-500 group-hover:rotate-2"
          />
          <Badge className="absolute bottom-4 right-4 z-40">{location}</Badge>
        </CardHeader>
        <CardContent className="px-1">
          <h1 className="line-clamp-1 my-2 text-[20px] font-semibold">{title}</h1>
          <p className="pb-1 text-base font-medium text-black">
            {format(new Date(start_date), 'dd MMMM yyyy')} <span>-</span>{' '}
            {format(new Date(end_date), 'dd MMMM yyyy')}
          </p>
          <p className="line-clamp-2 text-sm">{description}</p>
          <p className="pt-2 text-[16px] font-semibold text-black">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumSignificantDigits: Math.trunc(Math.abs(price)).toFixed()
                .length,
            }).format(price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardEvent;
