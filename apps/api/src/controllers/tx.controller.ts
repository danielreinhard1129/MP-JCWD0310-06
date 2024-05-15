import { createTransactionService } from '@/services/tx/create-tx.service';
import { getTransactionService } from '@/services/tx/get-tx.service';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await createTransactionService(req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await getTransactionService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
