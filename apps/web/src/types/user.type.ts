import { Event } from './event.type';
import { Transaction } from './transaction.type';
import { Coupon, UserCoupon } from './userCoupon.type';
import { UserVoucher, Voucher } from './userVoucher.type';

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

  Event: Event;
  Transaction: Transaction;
  Voucher: Voucher[]
  UserCoupon: UserCoupon;
  UserVoucher: UserVoucher;
  Coupon: Coupon;
}
