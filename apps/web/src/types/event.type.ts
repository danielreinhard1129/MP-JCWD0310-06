import { User } from './user.type';

export interface Event {
  date: string | number | Date;
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  thumbnail_url: string;
  limit: number;
  isAvailable: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  time: string;
  location: string;
  address: string | null;
  category: string;
  price: number;
  userId: number;

  Voucher?: Voucher[];
  user: User;
  Review: Review[];
}

export interface IFormEvent {
  title: string;
  description: string;
  thumbnail_url: File[];
  limit: number;
  start_date: Date;
  end_date: Date | null;
  time: string;
  location: string;
  address: string | null;
  userId?: number;
  category: string;
  price: number;
  voucherCode: string | null;
  voucherAmount: number | null;
  voucherLimit: number | null;
  voucherExpDate: Date | null;
}

export interface Voucher {
  id: number;
  code: string;
  discountAmount: number;
  limit: number;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  event: Event;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  eventId: number;

  user: User;
  event: Event;
}
