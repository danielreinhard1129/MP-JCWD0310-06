import { EventController } from '@/controllers/event.controller';
import { uploader } from '@/libs/uploader';
import { verifyToken } from '@/middlewares/verifyToken';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      uploader('IMG', '/images').array('thumbnail_url', 1),
      this.eventController.createEvent,
    );
    this.router.get(
      '/organizer',
      this.eventController.getEventsByOrganizerController,
    );
    this.router.get(
      '/filter',
      this.eventController.getEventsByParamsController,
    );
    this.router.get('/', this.eventController.getEventsController);
    this.router.patch(
      '/:id',
      uploader('IMG', '/images').array('thumbnail_url', 1),
      this.eventController.updateEventsController,
    );
    this.router.get('/:id', this.eventController.getEventController);
    this.router.post('/:id/reviews', this.eventController.createReview);
  }

  getRouter(): Router {
    return this.router;
  }
}
