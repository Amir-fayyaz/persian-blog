import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginAdminDto } from './dto/login.admin.dto';
import { AuthAdminService } from './auth.admin.service';
import { CreateAdminDto } from './dto/creataAdmin.admin.dto';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly AuthAdminService: AuthAdminService) {}

  @Post('login')
  async Login(@Body() data: LoginAdminDto) {
    return await this.AuthAdminService.loginAdmin(data);
  }

  @Post('addAdmin')
  @UseGuards()
  async AddAdmin(@Body() data: CreateAdminDto) {
    return await this.AuthAdminService.addAdmin(data);
  }
}
