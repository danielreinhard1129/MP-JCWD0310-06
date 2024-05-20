import { Event, Review } from './event.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  referralCode?: string;
  point: number;
  role?: string;
  userReward?: boolean;

  Review?: Review[];
  event?: Event;
}
