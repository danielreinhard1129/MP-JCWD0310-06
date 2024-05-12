import { Event } from './event.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  referral_code: string;
  point: number;
  role?: string;

  event?: Event;
}
