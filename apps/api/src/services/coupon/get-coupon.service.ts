import prisma from '@/prisma';

export const getCouponService = async (id: number) => {
  try {
    const coupon = await prisma.coupon.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!coupon) {
      throw new Error('coupon not found');
    }

    return coupon;
  } catch (error) {
    throw error;
  }
};
