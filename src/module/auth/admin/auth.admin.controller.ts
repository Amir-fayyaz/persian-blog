import { Body, Controller, Post } from '@nestjs/common';
import { LoginAdminDto } from './dto/login.admin.dto';
import { AuthAdminService } from './auth.admin.service';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly AuthAdminService: AuthAdminService) {}

  @Post('login')
  async Login(@Body() data: LoginAdminDto) {
    return await this.AuthAdminService.loginAdmin(data);
  }
}
