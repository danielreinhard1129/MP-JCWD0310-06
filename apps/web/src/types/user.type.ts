import { Event, Review } from './event.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  referralCode?: string;
  point: number;
  pointExpiredDate: Date;
  userReward: boolean;

  Review?: Review[];
  event?: Event;
}
