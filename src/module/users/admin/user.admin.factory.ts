import { Injectable } from '@nestjs/common';
import { IGetUserByPhoneNumber } from '../interface/IFindUserByMobile.type';
import { UserAdminService } from './services/user.admin.service';

@Injectable()
export class UserAdminFactory {
  private readonly getUserByPhoneNumber: IGetUserByPhoneNumber;

  constructor(userAdminService: UserAdminService) {
    this.getUserByPhoneNumber = userAdminService;
  }

  public async getUserByMobile(mobile: string) {
    return await this.getUserByPhoneNumber.getUserByPhoneNumber(mobile);
  }
}
