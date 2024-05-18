import { Event } from './event.type';
import { User } from './user.type';

export interface Transaction {
  id: number;
  createdAt: Date;
  updatedStatus: Date;
  status: TransactionStatus;
  total: number;
  userId: number;
  eventId: number;
  paymentProof: string;
  transactionDetail: {
    id: number;
    createdAt: Date;
    qty: number;
    transactionId: number;

    transaction: Transaction;
  };

  user: User;
  event: Event;
}

export enum TransactionStatus {
  PENDING,
  COMPLETE,
  ERROR,
  CANCELLED,
}

export interface IFormTransaction {
  transactionDetail: {
    qty: number;
  };
  userId?: number;
  eventId?: number;
}
