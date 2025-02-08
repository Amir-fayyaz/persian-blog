import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
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
import { CreateAdminDto } from './dto/creataAdmin.admin.dto';

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

  // public services
  public async addAdmin(data: CreateAdminDto) {
    //? Is there any admin with this profile ?
    const oldAdmin = await this.Admin_Repository.findOne({
      where: {
        email: data.email,
      },
    });

    if (oldAdmin) {
      throw new HttpException('There is another admin with this email', 400);
    }

    //Checking password
    const isMatchPassword = await this.compareAdminPassword(data.password);

    if (!isMatchPassword) throw new BadRequestException('Wrong password');

    //
    try {
      data.password = await bcrypt.hash(data.password, 10);

      const newAdmin = this.Admin_Repository.create(data);

      return await this.Admin_Repository.save(newAdmin);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

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
