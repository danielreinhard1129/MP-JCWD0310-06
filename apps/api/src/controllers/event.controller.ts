import { createEventService } from '@/services/event/create-event.service';
import { getEventService } from '@/services/event/get-event.service';
import { getEventsService } from '@/services/event/get-events.service';
import { getEventsByOrganizerService } from '@/services/event/get-eventsByOrganizer.service';
import { updateEventService } from '@/services/event/update-event.service';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  //CREATE EVENT
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files?.length) {
        throw new Error('no file uploaded');
      }

      const result = await createEventService(req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET EVENT
  async getEventController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getEventService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //GET EVENTS BY ORGANIZER
  async getEventsByOrganizerController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.query.id;
      const result = await getEventsByOrganizerService(String(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //GET EVENTS

  async getEventsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'start_date',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
        search: req.query.search as string,
      };

      const result = await getEventsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //UPDATE EVENT
  async updateEventsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updateEventService(
        Number(req.params.id),
        req.body,
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
