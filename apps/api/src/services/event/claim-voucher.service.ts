import prisma from '@/prisma';
import { Voucher } from '@prisma/client';

interface ClaimVoucherBody extends Omit<Voucher, 'createdAt' | 'updatedAt'> {}

export const claimVoucherService = async (
  id: number,
  body: ClaimVoucherBody,
) => {
  try {
    const { code, userId } = body;

    const voucher = await prisma.voucher.findFirst({
      where: { code },
    });

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    const event = await prisma.event.findFirst({
      where: { id },
    });

    if (voucher?.eventId !== event?.id) {
      throw new Error('event has no voucher');
    }

    if (voucher?.limit === 0) {
      throw new Error('voucher abis bos');
    }

    const update = await prisma.voucher.update({
      where: { id },
      data: { limit: Number(voucher?.limit) - 1 },
    });

    const claim = await prisma.userVoucher.create({
      data: {
        voucherId: Number(voucher?.id),
        isUse: false,
        userId: Number(user?.id),
      },
    });

    return { update, claim };
  } catch (error) {
    throw error;
  }
};
