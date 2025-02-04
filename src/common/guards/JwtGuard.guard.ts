import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { config } from 'dotenv';
import { UserAdminFactory } from 'src/module/users/admin/user.admin.factory';
import { Paylod } from '../types/paylod.type';

config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly UserFactory: UserAdminFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      !request.headers.authorization ||
      request.headers.authorization.startsWith('Bearer')
    ) {
      throw new BadRequestException('Invalid Token');
    }

    const token: string = request.headers.authorization.split(' ')[1];

    try {
      const paylod: Paylod = this.JwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.UserFactory.getUserByMobile(paylod.mobile);

      if (!user) {
        throw new UnauthorizedException(
          'There is no acount with this phone-number',
        );
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
