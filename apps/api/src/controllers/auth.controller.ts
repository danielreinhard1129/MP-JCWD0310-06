import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { KeepLoginService } from '@/services/auth/keep-login.service';
import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { resetPasswordService } from '@/services/auth/reset-password.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  // REGISTER
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // KEEP LOGIN
  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.user.id;

      const result = await KeepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // FORGOT-PASSWORD
  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // RESET PASSWORD
  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.body.user.id);
      const password = req.body.password;
      const result = await resetPasswordService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
