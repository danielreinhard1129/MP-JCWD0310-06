import { Router } from 'express';
import { CouponController } from '@/controllers/coupon.controller';

export class CouponRouter {
  private router: Router;
  private couponController: CouponController;

  constructor() {
    this.couponController = new CouponController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.couponController.getCoupon);
    this.router.post('/:id', this.couponController.useCoupon);
  }

  getRouter(): Router {
    return this.router;
  }
}
