import { User } from './user.type';
import { UserCoupon } from './userCoupon.type';

export interface Coupon {
  id: number;
  code: string;
  expirationDate: Date;
  discountAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  isUse: boolean;

  user: User;
  userCoupon: UserCoupon;
}
