import { format } from 'date-fns';
import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { TableBody, TableCell, TableRow } from './ui/table';

interface CardEventProps {
  invoice: string;
  status: string;
  total: number;
  createdAt: Date;
  transactionId: number;
  userId: number;
  eventId: number;
  eventTitle: string;
  userName: string;
  qty: number;
}

const TableTransactions: FC<CardEventProps> = ({
  invoice,
  status,
  total,
  createdAt,
  transactionId,
  userId,
  eventId,
  eventTitle,
  userName,
  qty,
}) => {
  return (
    <TableBody>
      <TableRow>
        {/* <Link href={`/transaction/${transactionId}`}> */}
        <TableCell className="font-medium">{invoice}</TableCell>
        <TableCell className="">{eventTitle}</TableCell>
        <TableCell className="">{userName}</TableCell>
        <TableCell>{format(new Date(createdAt), 'dd MMMM yyyy')}</TableCell>
        <TableCell className="">{total}</TableCell>
        <TableCell
          className={status === 'COMPLETE' ? 'text-green-500' : 'text-red-500'}
        >
          {status}
        </TableCell>

        <TableCell className="">
          {/*MODALS*/}
          <Dialog>
            <DialogTrigger>. . . . .</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-3xl">
                  Transaction is{'    '}
                  <span
                    className={
                      status === 'COMPLETE' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {status}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  <TableRow>
                    <TableCell className="font-medium">
                      Invoice Number
                    </TableCell>
                    <TableCell className="font-medium">{invoice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Buyer</TableCell>
                    <TableCell className="font-medium">{userName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Event Title</TableCell>
                    <TableCell className="font-medium">{eventTitle}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Qty</TableCell>
                    <TableCell className="font-medium">{qty}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Date</TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(createdAt), 'dd MMMM yyyy')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Voucher Discount
                    </TableCell>
                    <TableCell className="font-medium">{10000}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Coupon Discount
                    </TableCell>
                    <TableCell className="font-medium">{10000}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Point Use</TableCell>
                    <TableCell className="font-medium">{10000}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="font-medium">{total}</TableCell>
                  </TableRow>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TableCell>
        {/* </Link> */}
      </TableRow>
    </TableBody>
  );
};

export default TableTransactions;
