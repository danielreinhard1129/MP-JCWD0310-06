import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import TicketCounter from './TicketCounter';
import { Button } from '@/components/ui/button';

const OrderCard = () => {
  return (
    <Card className="rounded-2xl p-8">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col gap-2 space-y-1.5">
              <Label>Ticket Type</Label>
              <Select>
                <SelectTrigger id="ticket_type">
                  <SelectValue placeholder="Select ticket" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="vvip">VVIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Quantity</Label>
              <TicketCounter />
            </div>
            <div className="flex items-center justify-between">
              <Label>Price</Label>
              <div className="flex items-center gap-2">
                <p className="text-[#767676]">IDR</p>
                <p className="text-2xl font-semibold">990.000</p>
              </div>
            </div>
            <Button type="submit" className="w-full rounded-lg font-semibold">
              Get Ticket
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
