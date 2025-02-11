import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth.admin.module';
import { AuthClientModule } from './client/auth.client.module';

@Module({
  imports: [AuthAdminModule, AuthClientModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
