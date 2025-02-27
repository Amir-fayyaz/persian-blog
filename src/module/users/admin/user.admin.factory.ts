import { Injectable } from '@nestjs/common';
import { IGetUserByPhoneNumber } from '../interface/IFindUserByMobile.type';
import { UserAdminService } from './services/user.admin.service';
import { IFindUserById } from '../interface/IFindUserById.interface';

@Injectable()
export class UserAdminFactory {
  private readonly getUserByPhoneNumber: IGetUserByPhoneNumber;
  private readonly getUserById: IFindUserById;

  constructor(userAdminService: UserAdminService) {
    this.getUserByPhoneNumber = userAdminService;
    this.getUserById = userAdminService;
  }

  public async getUserByMobile(mobile: string) {
    return await this.getUserByPhoneNumber.getUserByPhoneNumber(mobile);
  }

  public async FindUserById(id: number) {
    return await this.getUserById.getUserById(id);
  }
}
