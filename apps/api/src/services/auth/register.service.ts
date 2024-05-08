import { hashPassword } from '@/libs/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (body: Omit<User, 'id'>) => {
  try {
    const cron = require('node-cron');

    const { email, password, referral_code } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error('Email already exist!');
    }

    const hashedPassword = await hashPassword(password);
    const GenerateReferralCode = await Math.random()
      .toString(36)
      .substring(2, 7);

    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
        referral_code: GenerateReferralCode,
        point: 0,
      },
    });

    if (referral_code) {
      const referralCode = await prisma.user.findFirst({
        where: { referral_code: referral_code },
      });

      if (!referralCode) {
        throw new Error('Invalid referral code');
      }
      await prisma.user.update({
        where: { id: referralCode?.id },
        data: { point: { increment: 10000 } },
      });

      cron.schedule('*/15 * * * * *', async () => {
        const updatedPoint = await prisma.user.findFirst({
          where: { point: referralCode.point },
        });

        // if (updatedPoint!.point > 0) {
        //   await prisma.user.update({
        //     where: { id: updatedPoint!.id },
        //     data: { point: { decrement: 10000 } },
        //   });
        // }
      });
    }

    return {
      message: 'Register success !',
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
