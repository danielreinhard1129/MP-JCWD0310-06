import { hashPassword } from '@/libs/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { addMonths } from 'date-fns';

export const registerService = async (body: Omit<User, 'id'>) => {
  try {
    const { email, password, referralCode } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error('Email already exist!');
    }

    const hashedPassword = await hashPassword(password);
    const GeneratereferralCode = await Math.random()
      .toString(36)
      .substring(2, 7);

    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
        referralCode: GeneratereferralCode,
        point: 0,
        pointExpiredDate: new Date(),
      },
    });

    if (referralCode) {
      const referral = await prisma.user.findFirst({
        where: { referralCode: referralCode },
      });

      if (!referral) {
        throw new Error('Invalid referral code');
      }
      const today = new Date();
      const expiredDate = addMonths(today, 3).toISOString();

      await prisma.user.update({
        where: { id: referral.id },
        data: {
          point: { increment: 10000 },
          pointExpiredDate: expiredDate,
        },
      });

      await prisma.user.update({
        where: { id: newUser.id },
        data: {
          userReward: true,
        },
      });

      return {
        message: 'Register success !',
        data: newUser,
      };
    }
  } catch (error) {
    throw error;
  }
};
