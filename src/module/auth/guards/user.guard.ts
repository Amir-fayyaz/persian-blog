import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPaylod } from '../types/paylod.user.type';
import { UserAdminFactory } from 'src/module/users/admin/user.admin.factory';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly UserFactory: UserAdminFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    const token: string = request.headers.authorization.split(' ')[1];

    try {
      const paylod: UserPaylod = await this.JwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.UserFactory.getUserByMobile(paylod.mobile);

      if (!user) {
        throw new NotFoundException(
          'There is no acount with this phone-number',
        );
      }

      request.user = user;

      return true;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
