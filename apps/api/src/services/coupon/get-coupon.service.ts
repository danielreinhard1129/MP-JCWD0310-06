import prisma from '@/prisma';

export const getCouponService = async (userId: number) => {
  try {
    const coupons = await prisma.coupon.findMany({
      where: { userId },
    });

    const claimableCoupons = coupons.filter((coupon) => {
      const now = new Date();
      if (now > coupon.expirationDate) {
        return false;
      }
      return true;
    });

    return claimableCoupons;
  } catch (error) {
    throw error;
  }
};
