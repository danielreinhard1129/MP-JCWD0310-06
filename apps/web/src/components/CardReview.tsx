'use client';

import { FC } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface CardReviewProps {
  fullName: string;
  rating: number;
  comment: string;
}

const CardReview: FC<CardReviewProps> = ({ fullName, rating, comment }) => {
  return (
    <Card className="flex flex-col gap-4 px-6 py-4">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="useravatar" />
          <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="font-semibold">{fullName}</h1>
          <div className="flex gap-2">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={star}
                  values={String(ratingValue)}
                  size={20}
                  fill={ratingValue <= rating ? '#FFD739' : '#e4e5e9'}
                  color={ratingValue <= rating ? '#FFD739' : '#e4e5e9'}
                />
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default CardReview;
