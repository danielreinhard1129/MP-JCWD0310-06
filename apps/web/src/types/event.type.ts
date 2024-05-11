import { User } from './user.type';

export interface Event {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  thumbnail_url: string;
  limit: number;
  booked: number;
  isAvailable: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  time: string;
  location: string;
  address: string | null;

  user: User;
}

export interface IFormCreateEvent {
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
}
