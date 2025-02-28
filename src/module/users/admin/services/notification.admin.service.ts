import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UserAdminFactory } from '../user.admin.factory';

@Injectable()
export class NotificationAdminService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly Notification_Repostory: Repository<NotificationEntity>,
    private readonly UserFactory: UserAdminFactory,
  ) {}

  //private methods

  //public methods
  public async createNotification(data: CreateNotificationDto, userId: number) {
    const user = await this.UserFactory.FindUserById(userId);

    if (!user) throw new NotFoundException('There is no user with this id');

    const newNotification = this.Notification_Repostory.create({
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      user,
    });

    return await this.Notification_Repostory.save(newNotification);
  }
}
