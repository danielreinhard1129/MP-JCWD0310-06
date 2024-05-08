import { Event } from './event.type';
import { User } from './user.type';

export interface Venue {
  id: number;
  name: string;
  address: string;
  contact: string;

  event: Event;
}

export interface IFormCreateVenue {
  name: string;
  address: string;
  contact: string;
  eventId? :number;
}
