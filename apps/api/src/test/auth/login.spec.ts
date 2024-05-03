import { comparePassword } from '@/libs/bcrypt';
import App from '../../app';
import { prismaMock } from '../prisma';
import request from 'supertest';

const requestBody = {
  email: 'user@mail.com',
  password: 'SecurePassword',
};

jest.mock('@/libs/bcrypt', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
}));

describe('POST /auth/login', () => {
  const { app } = new App();
  it('should login successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
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
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login success !');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
  it('should return error if email not found', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Incorrect email address or password !');
  });
  it('should return error if password not match', async () => {
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

    (comparePassword as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Incorrect email address or password !');
  });
});
