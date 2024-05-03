import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { appConfig } from '../utils/config';
import { User } from '@prisma/client';

const secretKey = appConfig.jwtSecretKey!;

interface PayloadToken extends Pick<User, 'id'> {}

declare global {
  namespace Express {
    interface Request {
      user: PayloadToken | null;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      message: 'token is missing',
    });
  }
  verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'token expired' });
      } else {
        return res.status(401).send({ message: 'invalid token' });
      }
    }
    req.body.user = payload as PayloadToken;
    next();
  });
};
