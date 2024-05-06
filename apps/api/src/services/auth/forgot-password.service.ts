import { NEXT_BASE_URL } from '@/config';
import { appConfig } from '@/utils/config';
import { sign } from 'jsonwebtoken';
import prisma from '../../prisma';
import { User } from '@prisma/client';
import { transporter } from '@/libs/nodemailer';

export const forgotPasswordService = async (body: Pick<User, 'email'>) => {
  try {
    const { email } = body;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error('invalid email address');
    }

    const token = sign({ id: user.id }, appConfig.jwtSecretKey, {
      expiresIn: '30m',
    });

    const link = NEXT_BASE_URL + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'link reset password',
      html: `<a href="${link}" target="_blank">Reset Password Here</a>`,
    });

    return {
      message: 'email has been sent',
    };
  } catch (error) {
    throw error;
  }
};
