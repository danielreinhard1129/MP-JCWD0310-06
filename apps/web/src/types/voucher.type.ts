import { User } from "./user.type";

export interface Voucher {
  id: number;
  code: string;
  discountAmount: string;
  limit: number;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;

  user: User
  event: Event
}