import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { PostReportService } from '../services/post-report.admin.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('api/v1/admin/post-reports')
export class PostReportController {
  constructor(private readonly PostReportService: PostReportService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'get all post-reports',
  })
  async getReports() {
    return await this.PostReportService.findAllReports();
  }
}
