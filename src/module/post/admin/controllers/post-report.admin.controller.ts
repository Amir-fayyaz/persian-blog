import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostReportService } from '../services/post-report.admin.service';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

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

  @Delete(':id')
  @ApiOperation({
    summary: 'delete special post-report',
  })
  @ApiParam({
    name: 'id',
    description: 'id of post-report record',
  })
  @HttpCode(HttpStatus.OK)
  async deleteReport(@Param('id', ParseIntPipe) id: number) {
    return await this.PostReportService.deleteReport(id);
  }
}
