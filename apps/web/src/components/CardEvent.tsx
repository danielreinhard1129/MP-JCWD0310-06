import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import samplecardimg from '../../public/samplecardimg.jpg';
import { Badge } from './ui/badge';

const CardEvent = () => {
  return (
    <Card className="overflow-hidden rounded-lg border-none pb-2 shadow-none hover:bg-neutral-100">
      <CardHeader className="relative h-[175px] w-full">
        <Image
          src={samplecardimg}
          alt="thumbnail"
          priority={true}
          className="absolute h-[175px] rounded-lg object-cover"
        />
        <Badge className="absolute bottom-4 right-4 z-50">Jakarta</Badge>
      </CardHeader>
      <CardContent className="px-3">
        <h1 className="py-2 text-xl font-semibold">Pestapora Music Fest</h1>
        <p className="text-black">
          Thu, Apr 2 <span>-</span> 8:00 PM
        </p>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa
          eveniet quibusdam. Sed, tenetur omnis blanditiis ipsam id vitae eius
          et eaque sapiente? Mollitia doloribus libero vel quia velit
          distinctio.
        </p>
        <p className="pt-2 text-[16px] font-semibold text-black">
          From IDR <span>990.000</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default CardEvent;
