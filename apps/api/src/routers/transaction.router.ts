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
    this.router.post(
      '/',
      uploader('IMG', '/txProof').array('paymentProof', 1),
      this.transactionController.createTransaction,
      );
      this.router.get(
        '/organizer',
        this.transactionController.getTransactionsController,
      );
    this.router.post(
      '/accepting',
      this.transactionController.acceptTransactionController,
    );
    this.router.post(
      '/rejecting',
      this.transactionController.rejectTransactionController,
    );
    this.router.get(
      '/:id',
      this.transactionController.getTransactionController,
    );
    this.router.patch(
      '/:id',
      uploader('IMG', '/txProof').array('paymentProof', 1),
      this.transactionController.updateTransactionController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
