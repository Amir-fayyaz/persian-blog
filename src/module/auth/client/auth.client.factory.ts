import { Injectable } from '@nestjs/common';
import { ICreateUser } from './interface/ICreateUser.interface';
import { CreateUserAdminDto } from 'src/module/users/admin/dto/createUser.admin.dto';
import { IFindUserByMobile } from './interface/IFindUser.interface';
import { UserAdminService } from 'src/module/users/admin/services/user.admin.service';

@Injectable()
export class AuthClientFactory {
  private readonly CreateUser: ICreateUser;
  private readonly findUserByMobile: IFindUserByMobile;
  constructor(userService: UserAdminService) {
    this.CreateUser = userService;
    this.findUserByMobile = userService;
  }

  public async CreateNewUser(data: CreateUserAdminDto) {
    return await this.CreateUser.createUser(data);
  }

  public async FindUserByMobile(mobile: string) {
    return await this.findUserByMobile.getUserByPhoneNumber(mobile);
  }
}
