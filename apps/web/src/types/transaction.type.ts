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
  qty: number;

  user: User;
  event: Event;
}

export enum TransactionStatus {
  PENDING,
  COMPLETE,
  WAITING,
  CANCELLED,
  EXPIRED,
}

export interface IFormTransaction {
  qty: number;
  paymentProof: File[];
  userId?: number;
  eventId?: number;
}
