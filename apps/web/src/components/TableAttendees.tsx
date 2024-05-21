import { format } from 'date-fns';
import { FC } from 'react';
import { TableBody, TableCell, TableRow } from './ui/table';

interface TableAttendeesList {
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
  paymentProof: string;
  no: number;
}

const TableAttendees: FC<TableAttendeesList> = ({
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
  paymentProof,
  no,
}) => {
  return (
    <TableBody>
      <TableRow>
        {/* <Link href={`/transaction/${transactionId}`}> */}
        <TableCell className="font-medium">{no + 1}</TableCell>
        <TableCell className="">{eventTitle}</TableCell>
        <TableCell className="">{userName}</TableCell>
        <TableCell className="">{qty}</TableCell>
        <TableCell>{format(new Date(createdAt), 'dd MMMM yyyy')}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableAttendees;
