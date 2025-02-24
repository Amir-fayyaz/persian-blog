import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PostReportService } from '../services/post-report.admin.service';

@Controller('api/v1/admin/post-reports')
export class PostReportController {
  constructor(private readonly PostReportService: PostReportService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getReports() {
    return await this.PostReportService.findAllReports();
  }
}
