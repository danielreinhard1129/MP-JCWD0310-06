import App from '@/app';
import { prismaMock } from '../prisma';
import request from 'supertest';

const requestBody = {
  title: 'title',
  description: 'description',
  thumbnail_url: 'thumbnail_url',
  limit: 1,
  start_date: new Date(),
  end_date: new Date(),
  time: 'time',
  location: 'location',
  address: 'address',
  category: 'category',
  price: 1,
  userId: 1,
};

describe('POST /events', async () => {
  const { app } = new App();
  it('should create successfully', async () => {
    prismaMock.event.create.mockResolvedValueOnce({
      id: 1,
      title: 'mock title',
      address: 'mock address',
      category: 'mock category',
      createdAt: new Date(),
      deletedAt: new Date(),
      description: 'mock description',
      end_date: new Date(),
      isAvailable: true,
      limit: 1,
      location: 'mock location',
      price: 1,
      start_date: new Date(),
      thumbnail_url: 'mock thumbnail',
      time: 'time',
      updatedAt: new Date(),
      userId: 1,
    });

    const response = await request(app).post('/api/events').send(requestBody);

    expect(response.status).toBe(200);
  });
});
