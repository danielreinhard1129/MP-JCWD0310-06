import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import samplecardimg from 'public/samplecardimg.jpg';
import { Badge } from './ui/badge';

const CardEvent = () => {
  return (
    <div>
      <Card className="rounded-lgs overflow-hidden border-none pb-2 shadow-none hover:bg-neutral-100">
        <CardHeader className="relative h-[175px] w-full">
          <Image
            src={samplecardimg}
            alt="thumbnail"
            className="absolute h-[175px] object-cover"
          />
          <Badge className="absolute bottom-4 right-4 z-50">
            <p>Jakarta</p>
          </Badge>
        </CardHeader>
        <CardContent className="px-4">
          <CardTitle className="py-3">
            <h2>Pestapora Music Fest</h2>
          </CardTitle>
          <CardDescription className="grid gap-1 pb-2">
            <p className="text-black">
              Thu, Apr 2 <span>-</span> 8:00 PM
            </p>
            <p className="line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              culpa eveniet quibusdam. Sed, tenetur omnis blanditiis ipsam id
              vitae eius et eaque sapiente? Mollitia doloribus libero vel quia
              velit distinctio.
            </p>
            <p className="text-[16px] font-semibold text-black pt-2">
              From IDR <span>990.000</span>
            </p>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardEvent;
