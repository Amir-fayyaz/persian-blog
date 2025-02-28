import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationClientService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly Notification_Repository: Repository<NotificationEntity>,
  ) {}
}
