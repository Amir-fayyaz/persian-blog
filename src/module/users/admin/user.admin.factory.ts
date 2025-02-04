import { Injectable } from '@nestjs/common';
import { UserAdminService } from './user.admin.service';
import { IGetUserByPhoneNumber } from '../interface/IFindUserByMobile.type';

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
