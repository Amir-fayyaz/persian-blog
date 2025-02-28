import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationClientService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly Notification_Repository: Repository<NotificationEntity>,
  ) {}

  //private methods

  //public methods
  public async getUserNotifications(userId: number) {
    const notifications = await this.Notification_Repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: { createdAt: 'DESC' },
    });

    if (notifications.length < 1)
      throw new NotFoundException('There is no notification for this user');

    return {
      count: notifications.length,
      notifications,
    };
  }
}
