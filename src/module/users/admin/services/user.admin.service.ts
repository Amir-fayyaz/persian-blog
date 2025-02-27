import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserAdminDto } from '../dto/createUser.admin.dto';
import { UpdateUserAdminDto } from '../dto/updateUser.admin.dto';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  // public routes
  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.User_Repository.find();
  }

  public async getUserById(id: number): Promise<UserEntity> {
    const user = await this.User_Repository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  public async createUser(data: CreateUserAdminDto): Promise<UserEntity> {
    //? Is there any acount with this phone-number
    const user = await this.User_Repository.findOne({
      where: {
        mobile: data.mobile,
      },
    });

    if (user) {
      throw new HttpException('There is acount with this phone-number', 400);
    }

    //* Create user
    try {
      const new_acount = this.User_Repository.create(data);

      await this.User_Repository.save(new_acount);

      return new_acount;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  public async updateUser(id: number, data: UpdateUserAdminDto) {
    const user = await this.User_Repository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('There is no acount with this id');
    }

    if (user && Number(user.id) !== id) {
      throw new HttpException('There is another acount with this info', 400);
    }

    try {
      await this.User_Repository.update(id, {
        ...data,
      });

      return {
        id,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteUser(id: number): Promise<number> {
    const user = await this.User_Repository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('There is no acount with this id');
    }

    try {
      await this.User_Repository.remove(user);

      return id;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //Private routes

  public async getUserByPhoneNumber(
    mobile: string,
  ): Promise<UserEntity | null> {
    return await this.User_Repository.findOne({
      where: {
        mobile: mobile,
      },
    });
  }
}
