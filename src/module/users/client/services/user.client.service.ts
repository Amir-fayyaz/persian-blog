import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { EditUserClientDto } from '../dto/editUser.client.dto';

@Injectable()
export class UserClientService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  public async editProfile(
    id: number,
    user: UserEntity,
    data: EditUserClientDto,
  ) {
    //? Does any user exist with this id ?
    const User = await this.User_Repository.findOne({
      where: {
        id: id,
      },
    });

    if (!User) {
      throw new NotFoundException('There is no acount with this id');
    }

    //? Does user edit his/her profile or not ?
    if (User && user.id !== id) {
      throw new BadRequestException('This profile is not related to you !');
    }

    //? Is there any acount with this new data ?
    const oldUser = await this.User_Repository.findOne({
      where: {
        mobile: data.mobile,
      },
    });

    if (oldUser && oldUser.id !== id) {
      throw new HttpException(
        'There is another acount with this phone-number',
        400,
      );
    }

    //* edit info and return new-acount
    try {
      await this.User_Repository.update(id, { ...data });

      return {
        id,
        data,
      };
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }

  public async deleteAcount(User: UserEntity) {
    const user = await this.User_Repository.findOne({
      where: {
        id: User.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.User_Repository.remove(user);

      return user;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
