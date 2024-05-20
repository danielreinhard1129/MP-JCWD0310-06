import { Event, Voucher } from './event.type';
import { Coupon } from './coupon.type';
import { Transaction } from './transaction.type';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  referralCode?: string;
  point: number;
  pointExpiredDate: Date;
  role?: string;
  userReward: boolean;

  userVoucher?: UserVoucher[];
  userCoupon?: UserCoupon[];
  event?: Event[];
  transaction?: Transaction[];
  voucher?: Voucher[];
  coupon?: Coupon[];
}

export interface UserCoupon {
  id: number;
  userId: number;
  couponId: number;
  isUse: boolean;

  user: User;
  transaction: Transaction[];
  coupon: Coupon[];
}

export interface UserVoucher {
  id: number;
  userId: number;
  couponId: number;
  isUse: boolean;

  user: User;
  voucher: Voucher;
  transaction: Transaction[];
}
