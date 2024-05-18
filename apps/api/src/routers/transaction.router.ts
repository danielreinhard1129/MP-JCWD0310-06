import { Router } from 'express';
import { uploader } from '@/libs/uploader';
import { TransactionController } from '@/controllers/tx.controller';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/organizer', this.transactionController.getTransactionsController);
    this.router.post(
      '/',
      uploader('IMG', '/txProof').array('paymentProof', 1),
      this.transactionController.createTransaction,
    );
    this.router.get(
      '/:id',
      this.transactionController.getTransactionController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
