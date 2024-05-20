import { Transaction } from './transaction.type';
import { User } from './user.type';

export interface UserCoupon {
  id: number;
  userId: number;
  couponId: number;
  isUse: boolean;

  user: User;
  coupon: Coupon;
  Transaction: Transaction;
}

export interface Coupon {
  id: number;
  code: string;
  expirationDate: Date;
  discountAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;

  user: User;
  UserCoupon: UserCoupon;
  isUse: boolean;
}
