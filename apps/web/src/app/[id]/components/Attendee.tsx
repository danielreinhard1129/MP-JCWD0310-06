import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { FC } from 'react';

interface TableAttendeesList {
  startDate: Date;
  eventTitle: string;
  userName: string;
  qty: number;
  no: number;
}
const Attendee: FC<TableAttendeesList> = ({
  qty,
  startDate,
  userName,
  no,
  eventTitle,
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{no}</TableCell>
        <TableCell>{eventTitle}</TableCell>
        <TableCell>{userName}</TableCell>
        <TableCell>{qty}</TableCell>
        <TableCell className="text-right">
          {format(new Date(startDate), 'dd MMMM yyyy')}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default Attendee;
