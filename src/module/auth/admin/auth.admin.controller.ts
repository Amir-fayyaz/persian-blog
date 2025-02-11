import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginAdminDto } from './dto/login.admin.dto';
import { AuthAdminService } from './auth.admin.service';
import { CreateAdminDto } from './dto/creataAdmin.admin.dto';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AdminEntity } from '../entities/admin.entity';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly AuthAdminService: AuthAdminService) {}

  //POST -
  @Post('login')
  @ApiOperation({
    summary: 'login admin to his/her acount',
    description: 'admin authenticate by email & password and get jwt-token',
  })
  @ApiBody({
    description: 'login admin credentials',
    type: LoginAdminDto,
  })
  @ApiResponse({
    status: 200,
    description: 'login was successfully & recive token',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no admin with this email',
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect password',
  })
  @HttpCode(HttpStatus.OK)
  async Login(@Body() data: LoginAdminDto) {
    return await this.AuthAdminService.loginAdmin(data);
  }

  //POST -
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('addAdmin')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Admin can add another admin',
    description: 'Create new admin & return newAdmin info',
  })
  @ApiBody({
    description: 'add admin credentials',
    type: CreateAdminDto,
  })
  @ApiResponse({
    status: 201,
    description: 'new admin added successfully',
    type: AdminEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 400,
    description: 'There is another admin with this email | Wrong password',
  })
  async AddAdmin(@Body() data: CreateAdminDto) {
    return await this.AuthAdminService.addAdmin(data);
  }
}
