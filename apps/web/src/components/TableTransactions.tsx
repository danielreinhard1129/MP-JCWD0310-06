import useAcceptTransaction from '@/hooks/api/tx/useAcceotTransaction';
import useRejectTransaction from '@/hooks/api/tx/useRejectTransaction';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { TableBody, TableCell, TableRow } from './ui/table';

interface TableTransactionsTab {
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
}

const TableTransactions: FC<TableTransactionsTab> = ({
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
}) => {
  const { accepting } = useAcceptTransaction();
  const { rejecting } = useRejectTransaction();
  const values = { id: Number(transactionId) };
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
          <Dialog>
            <DialogTrigger>Details...</DialogTrigger>
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
                <ScrollArea className="h-72 w-full rounded-md border">
                  <div className="p-4=">
                    {/* MODALS  */}
                    <DialogDescription className="w-full">
                      <TableRow className="w-full">
                        <TableCell className="w-[150px] font-medium">
                          Invoice Number
                        </TableCell>
                        <TableCell className="w-[150px] font-medium">
                          {invoice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Buyer</TableCell>
                        <TableCell className="font-medium">
                          {userName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Event Title
                        </TableCell>
                        <TableCell className="font-medium">
                          {eventTitle}
                        </TableCell>
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
                        <TableCell className="font-medium">Total</TableCell>
                        <TableCell className="font-medium">{total}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Payment Proof
                        </TableCell>
                        <TableCell className="relative">
                          <Image
                            src={paymentProof}
                            alt="thumbnail"
                            fill
                            className="rounded-lg object-cover group-hover:rotate-2 group-hover:scale-110 group-hover:transition-all group-hover:duration-500"
                          />
                        </TableCell>
                      </TableRow>

                      {status === 'WAITING' ? (
                        <div className="my-4 flex justify-center gap-2">
                          {/* REJECT */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">REJECT</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    rejecting(values);
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          {/* APPROVE */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">APPROVE</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    accepting(values);
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ) : null}
                    </DialogDescription>
                  </div>
                </ScrollArea>
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
