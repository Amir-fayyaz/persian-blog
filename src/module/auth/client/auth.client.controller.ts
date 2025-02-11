import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthClientService } from './auth.client.service';
import { SignUpClientDto } from './dto/SignUp.client.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInClientDto } from './dto/SignIn.client.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/client')
export class AuthClientController {
  constructor(
    private readonly AuthClientService: AuthClientService,
    private readonly JwtService: JwtService,
  ) {}

  //GET -
  @Get('getOtp')
  @ApiOperation({
    summary: 'for get otp to login',
    description: 'You can get otp peer 2 minute for login',
  })
  @ApiBody({
    description: 'get otp credentials',
    type: SignUpClientDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'otp code recived successfully',
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many request , You can recive otp code peer 2m',
  })
  @HttpCode(HttpStatus.OK)
  async getOtp(@Body() data: SignUpClientDto) {
    return await this.AuthClientService.CreateOtp(data.mobile);
  }

  //POST -
  @Post('SignIn')
  @HttpCode(HttpStatus.OK)
  async SignIn(@Body() data: SignInClientDto) {
    await this.AuthClientService.VerifyOtp(data);

    const user = await this.AuthClientService.getUser(data);

    return {
      access_token: await this.JwtService.signAsync({
        id: user.id,
        mobile: user.mobile,
      }),
    };
  }
}
