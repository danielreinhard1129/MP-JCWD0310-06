import prisma from '@/prisma';
import { Coupon } from '@prisma/client';

interface UseCouponBody extends Omit<Coupon, 'createdAt' | 'updatedAt'> {}

export const useCouponService = async (id: number, body: UseCouponBody) => {
  try {
    const { code } = body;

    const coupon = await prisma.coupon.findFirst({
      where: { code },
    });

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (coupon?.userId !== user?.id) {
      throw new Error('coupon not found');
    }

    if (coupon?.isUse === true) {
      throw new Error('you already use this coupon');
    }

    return await prisma.userCoupon.create({
      data: {
        couponId: Number(coupon?.id),
        isUse: false,
        userId: Number(user?.id),
      },
    });
  } catch (error) {
    throw error;
  }
};
