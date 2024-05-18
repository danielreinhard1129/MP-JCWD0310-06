import prisma from '@/prisma';
import { Coupon } from '@prisma/client';

interface UseCouponBody
  extends Omit<Coupon, 'createdAt' | 'updatedAt' | 'code'> {}

export const useCouponService = async (id: number, body: UseCouponBody) => {
  try {
    const { userId } = body;

    const coupon = await prisma.coupon.findFirst({
      where: { id, userId },
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

    await prisma.coupon.update({
      where: { id },
      data: {
        isUse: true,
      },
    });

    return await prisma.userCoupon.create({
      data: {
        couponId: Number(coupon?.id),
        isUse: false,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
