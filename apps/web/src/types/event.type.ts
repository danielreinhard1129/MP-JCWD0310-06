import { User } from './user.type';

export interface Event {
  date: string | number | Date;
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  thumbnail_url: string;
  seat: number;
  booked: number;
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

  user: User;
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
}
