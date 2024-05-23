import { Transaction } from './transaction.type';
import { User } from './user.type';

export interface UserVoucher {
  id: number;
  userId: number;
  voucherId: number;
  isUse: boolean;

  user: User;
  voucher: Voucher;
  Transaction: Transaction;
}

export interface Voucher {
  id: number;
  code: string;
  discountAmount: string;
  limit: number;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  userId: number;

  user: User;
  event: Event[];
}
