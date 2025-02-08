import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { config } from 'dotenv';
import { LoginAdminDto } from './dto/login.admin.dto';
import { AdminPaylod } from '../types/paylod.admin.type';
import { JwtService } from '@nestjs/jwt';

config();

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly Admin_Repository: Repository<AdminEntity>,
    private readonly JwtService: JwtService,
  ) {}

  // private serivces
  private async compareAdminPassword(password: string): Promise<Boolean> {
    return password === process.env.ADMIN_PASSWORD;
  }

  private async FindAdminByEmail(email: string): Promise<AdminEntity | null> {
    return await this.Admin_Repository.findOne({
      where: {
        email,
      },
    });
  }

  private async CreateAdmin(data) {}
  // public services
  public async addAdmin() {}

  public async loginAdmin(data: LoginAdminDto) {
    //Does Admin exist ?
    const admin = await this.FindAdminByEmail(data.email);

    if (!admin) {
      throw new NotFoundException('There is no admin with this email');
    }

    //Does Passwords are correct ?
    const isMatchPassword = await this.compareAdminPassword(data.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Incorrect Password');
    }

    //Create JwtToken for this admin & return token
    try {
      const paylod: AdminPaylod = {
        id: admin.id,
        email: admin.email,
      };

      const token = await this.JwtService.signAsync(paylod);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
