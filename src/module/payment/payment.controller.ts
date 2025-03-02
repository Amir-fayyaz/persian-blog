import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('api/v1/payment')
export class PaymentController {
  constructor(private readonly PaymentService: PaymentService) {}
}
