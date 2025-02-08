import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth.admin.module';

@Module({
  imports: [AuthAdminModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
