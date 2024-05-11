import { User } from './user.type';

export interface Location {
  id: number;
  city: string;
}

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
  venue_name: string | null;
  venue_address: string | null;

  location: Location;
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
  venue_name: string | null;
  venue_address: string | null;
  userId?: number;
  locationId?: number;
  location: {
    city: string;
  };
}
