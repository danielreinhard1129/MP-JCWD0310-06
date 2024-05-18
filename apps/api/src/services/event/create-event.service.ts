import prisma from '@/prisma';
import { Event } from '@prisma/client';

interface CreateEventBody
  extends Omit<Event, 'id' | 'deletedAt' | 'createdAt' | 'updatedAt'> {
  voucherCode: string;
  voucherLimit: number;
  voucherAmount: number;
  voucherExpDate: Date;
}

export const createEventService = async (
  body: CreateEventBody,
  file: Express.Multer.File,
) => {
  try {
    const {
      title,
      userId,
      limit,
      price,
      address,
      category,
      description,
      end_date,
      isAvailable,
      location,
      start_date,
      thumbnail_url,
      time,
      voucherAmount,
      voucherCode,
      voucherExpDate,
      voucherLimit,
    } = body;

    const existingTitle = await prisma.event.findFirst({
      where: { title },
    });

    if (existingTitle) {
      throw new Error('title already in use');
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('user not found');
    }

    const createEvent = await prisma.event.create({
      data: {
        thumbnail_url: `/images/${file.filename}`,
        limit: Number(limit),
        userId: Number(userId),
        price: Number(price),
        category,
        description,
        location,
        start_date,
        time,
        end_date,
        title,
        address,
        isAvailable,
      },
    });

    let createVoucher = null;

    if (voucherAmount && voucherCode && voucherExpDate && voucherLimit) {
      createVoucher = await prisma.voucher.create({
        data: {
          code: voucherCode,
          discountAmount: Number(voucherAmount),
          expirationDate: voucherExpDate,
          limit: Number(voucherLimit),
          eventId: Number(createEvent.id),
          userId: Number(userId),
        },
      });
    }

    return {
      event: createEvent,
      voucher: createVoucher,
    };
  } catch (error) {
    throw error;
  }
};
