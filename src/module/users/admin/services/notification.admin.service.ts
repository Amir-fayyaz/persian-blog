import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationAdminService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly Notification_Repostory: Repository<NotificationEntity>,
  ) {}
}
