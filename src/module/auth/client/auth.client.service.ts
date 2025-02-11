import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { generateCode } from '../types/createOtp.type';
import { randomInt } from 'crypto';
import { SignInClientDto } from './dto/SignIn.client.dto';
import { AuthClientFactory } from './auth.client.factory';

@Injectable()
export class AuthClientService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly Otp_Repository: Repository<OtpEntity>,
    private readonly AuthClientFactory: AuthClientFactory,
  ) {}

  // private services

  private async DeleteOtp(otp: OtpEntity) {
    return await this.Otp_Repository.delete({
      mobile: otp.mobile,
      code: otp.code,
    });
  }

  private async CheckRateForCreateOtp(mobile: string): Promise<void> {
    const otp = await this.Otp_Repository.findOne({
      where: {
        mobile,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (otp) {
      const expireResult: Boolean = await this.CheckExpire(otp);

      if (!expireResult)
        throw new HttpException(
          'Too many request for otp',
          HttpStatus.TOO_MANY_REQUESTS,
        );
    }
  }

  private async ValidateOtp(
    mobile: string,
    otpCode: string,
  ): Promise<OtpEntity> {
    const otp = await this.Otp_Repository.findOne({
      where: {
        mobile,
      },
    });

    if (!otp) {
      throw new NotFoundException('No otp for this number');
    }

    const isMatchOtp: Boolean = await bcrypt.compare(otpCode, otp.code);

    if (!isMatchOtp) {
      throw new BadRequestException('Wrong otp');
    }

    return otp;
  }

  private async CheckExpire(otp: OtpEntity): Promise<Boolean> {
    return otp.expiresAt < new Date(Date.now());
  }

  private async generateOtp(): Promise<generateCode> {
    const otpCode = randomInt(10000, 99999).toString();
    const hashedOtpCode = await bcrypt.hash(otpCode, 10);

    return {
      otp: otpCode,
      hashedOtp: hashedOtpCode,
    };
  }
  //public services
  public async CreateOtp(mobile: string): Promise<string> {
    // Check rate
    await this.CheckRateForCreateOtp(mobile);

    const newOtpCode = await this.generateOtp();

    //Create otp & save to databse
    const newOtp = this.Otp_Repository.create({
      mobile,
      code: newOtpCode.hashedOtp,
    });
    await this.Otp_Repository.save(newOtp);

    // return five digit code
    return newOtpCode.otp;
  }

  public async VerifyOtp(data: SignInClientDto) {
    //validate otp
    const otp = await this.ValidateOtp(data.mobile, data.otpCode);

    // check expire time of otp
    const expireResult = await this.CheckExpire(otp);

    if (expireResult) {
      throw new BadRequestException('otp has expired');
    }

    await this.DeleteOtp(otp);
  }

  public async getUser(data: SignInClientDto) {
    const user = await this.AuthClientFactory.FindUserByMobile(data.mobile);

    return user
      ? user
      : await this.AuthClientFactory.CreateNewUser({
          mobile: data.mobile,
          name: '',
        });
  }
}
