import prisma from '@/prisma';
import { Event } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';

const defaultDir = '../../../public/images';

export const updateEventService = async (
  id: number,
  body: Partial<Event>,
  file?: Express.Multer.File,
) => {
  try {
    const { title } = body;
    const event = await prisma.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw new Error('Blog not found');
    }
    if (title) {
      const eventTitle = await prisma.event.findFirst({
        where: { title: { equals: title } },
      });
      if (eventTitle) {
        throw new Error('Title already in use');
      }
    }

    if (file) {
      body.thumbnail_url = `/images/${file.filename}`;
      const imagePath = join(
        __dirname,
        '../../../public' + event.thumbnail_url,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.event.update({
      where: { id },
      data: { ...body },
    });
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};
