import { Controller } from '@nestjs/common';
import { PostReportClientService } from '../services/post-report.client.service';

@Controller('api/v1/client/post-report')
export class PostReportClientController {
  constructor(private readonly PostReportService: PostReportClientService) {}
}
