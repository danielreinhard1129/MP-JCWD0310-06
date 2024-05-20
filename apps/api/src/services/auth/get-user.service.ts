import prisma from '@/prisma';

export const getUserService = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        UserCoupon: true,
        UserVoucher: true,
        Transaction: true,
        Coupon: true,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};
