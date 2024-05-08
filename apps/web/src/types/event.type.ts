import { User } from './user.type';
import { Venue } from './venue.type';

export interface Event {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  time: Date;
  description: string;
  thumbnail_url: string;
  limit: number;
  booked: number;
  isAvailable: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  venue: Venue;
  user: User;
}

export interface IFormCreateEvent {
  title: string;
  description: string;
  // limit: number;
  // booked: number;
  thumbnail_url: File[];
  userId?: number;
}
