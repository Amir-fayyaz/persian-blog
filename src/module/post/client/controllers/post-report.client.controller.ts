import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostReportClientService } from '../services/post-report.client.service';
import { User } from 'src/common/decorators/getUser.decorator';
import { UserEntity } from 'src/module/users/entities/user.entity';
import { UserGuard } from 'src/module/auth/guards/user.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('client-postReport')
@UseGuards(UserGuard)
@Controller('api/v1/client/post-report')
export class PostReportClientController {
  constructor(private readonly PostReportService: PostReportClientService) {}

  //POST -
  @Post(':id')
  @ApiOperation({
    summary: 'For create new report to any post',
  })
  @ApiParam({
    name: 'id',
    description: 'post-id of you want to report it',
    type: Number,
  })
  @HttpCode(HttpStatus.CREATED)
  async createPostReport(
    @Param('id', ParseIntPipe) postId: number,
    @User() user: UserEntity,
  ) {
    return await this.PostReportService.createPostReport(postId, user);
  }

  //DELETE -
  @Delete(':id')
  @ApiOperation({ summary: 'For delete report' })
  @ApiParam({
    name: 'id',
    description: 'post-id you want to delete report',
    type: Number,
  })
  @HttpCode(HttpStatus.OK)
  async deletePostReport(
    @Param('id', ParseIntPipe) postId: number,
    @User() user: UserEntity,
  ) {
    return await this.PostReportService.deletePostReport(postId, user);
  }
}
