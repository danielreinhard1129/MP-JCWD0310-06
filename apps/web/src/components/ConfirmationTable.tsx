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
}

const TableTransactions: FC<CardEventProps> = ({
  invoice,
  status,
  total,
  createdAt,
  transactionId,
  userId,
  eventId,
}) => {
  return (
    <TableBody>
      <TableRow>
        {/* <Link href={`/transaction/${transactionId}`}> */}
        <TableCell className="font-medium">{invoice}</TableCell>
        <TableCell
          className={status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}
        >
          {status}
        </TableCell>
        <TableCell>{format(new Date(createdAt), 'dd MMMM yyyy')}</TableCell>
        <TableCell className="">{total}</TableCell>
        <TableCell className="">
          <Dialog>
            <DialogTrigger>. . . . .</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-3xl">
                  Transaction is{'    '}
                  <span
                    className={
                      status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'
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
                    <TableCell className="font-medium">User Id</TableCell>
                    <TableCell className="font-medium">{userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Event Id</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Qty</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Date</TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(createdAt), 'dd MMMM yyyy')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Voucher Use</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Reward Use</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Point Use</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="font-medium">{eventId}</TableCell>
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
