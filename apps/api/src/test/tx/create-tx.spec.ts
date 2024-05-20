import App from '@/app';
import { prismaMock } from '../prisma';
import request from 'supertest';

const requestBody = {
  userId: 1,
  qty: 0,
  eventId: 1,
  isPointUse: false,
  isUseCoupon: false,
  isUseVoucher: false,
};

describe('POST /transaction', async () => {
  const { app } = new App();
  it('should create successfully', async () => {
    prismaMock.transaction.create.mockResolvedValueOnce({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
      eventId: 1,
      invoice: 'mock invoice',
      isPointUse: false,
      isUseCoupon: false,
      isUseVoucher: false,
      paymentProof: 'mock paymentProof',
      qty: 1,
      status: 'COMPLETE',
      total: 1,
      userCouponId: 1,
      userVoucherId: 1,
    });

    const response = await request(app).post('/api/events').send(requestBody);

    expect(response.status).toBe(200);
  });
});
