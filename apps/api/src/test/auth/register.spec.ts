import App from '../../app';
import { prismaMock } from '../prisma';
import request from 'supertest';

const requestBody = {
  fullName: 'fullname',
  email: 'user@mail.com',
  password: 'SecurePassword',
};

describe('POST /auth/register', () => {
  const { app } = new App();
  it('should register successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullName',
      email: 'mock email',
      password: 'mock password',
      avatar: 'mock avatar',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'mock role',
      referral_code: 'mock referral code',
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
  });

  it('should return eror if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullName',
      email: 'mock email',
      password: 'mock password',
      avatar: 'mock avatar',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'mock role',
      referral_code: 'mock referral code',
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
  });
});
