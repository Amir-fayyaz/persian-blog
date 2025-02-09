import { Injectable } from '@nestjs/common';
import { IFindAdminByEmail } from './interface/IFindAdminByEmail';
import { AuthAdminService } from './auth.admin.service';

@Injectable()
export class AuthAdminFactory {
  private readonly FindAdminByEmail: IFindAdminByEmail;

  constructor(AuthAdminService: AuthAdminService) {
    this.FindAdminByEmail = AuthAdminService;
  }

  public async getAdminByEmail(email: string) {
    return await this.FindAdminByEmail.FindAdminByEmail(email);
  }
}
