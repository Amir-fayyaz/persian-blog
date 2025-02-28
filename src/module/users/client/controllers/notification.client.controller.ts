import { Controller } from '@nestjs/common';
import { NotificationClientService } from '../services/notification.client.service';

@Controller('api/v1/client/notifications')
export class NotificationClientController {
  constructor(
    private readonly NotificationService: NotificationClientService,
  ) {}
}
