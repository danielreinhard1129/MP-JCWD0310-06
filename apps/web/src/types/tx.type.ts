import { Event } from './event.type';
import { User } from './user.type';

export interface Transaction {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: [];
  qty: number;
  total: number;
  paymentProof: string;
  eventId: number;
  userId: number;
  event: Event;
  user: User;
}

export interface IFormTransaction {
  qty: number;
}