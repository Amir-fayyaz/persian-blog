import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthAdminFactory } from '../admin/auth.admin.factory';
import { AdminPaylod } from '../types/paylod.admin.type';
import { JwtService } from '@nestjs/jwt';

import { config } from 'dotenv';

config();

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly AuthAdminFactory: AuthAdminFactory,
    private readonly JwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('Invalid Token');
    }

    const token: string = request.headers.authorization.split(' ')[1];

    try {
      const paylod: AdminPaylod = await this.JwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const admin = await this.AuthAdminFactory.getAdminByEmail(paylod.email);

      console.log(admin);
      if (!admin) {
        throw new UnauthorizedException(
          'There is no Admin-acount with this email',
        );
      }

      request.admin = admin;

      return true;
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}
