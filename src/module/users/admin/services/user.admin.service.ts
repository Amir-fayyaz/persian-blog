import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { PaginationTool } from 'src/common/utils/pagination.util';
import { CreateUserAdminDto } from '../dto/createUser.admin.dto';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  // public routes
  public async getAllUsers(page: number): Promise<UserEntity[]> {
    const pagination = PaginationTool({ page, take: 20 });

    return await this.User_Repository.find({
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.take,
    });
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

  // export methods
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
