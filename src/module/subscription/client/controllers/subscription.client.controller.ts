import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@ApiTags('client-subscription')
@UseGuards(UserGuard)
@Controller('api/v1/client/subscriptions')
export class SubscriptionClientController {
  constructor() {}
}
