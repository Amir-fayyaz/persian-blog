import { Controller, UseGuards } from '@nestjs/common';
import { CommentClientService } from '../services/comment.client.service';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/module/auth/guards/user.guard';

@ApiTags('client-comment')
@UseGuards(UserGuard)
@Controller('api/v1/client/comment')
export class CommentClientController {
  constructor(private readonly CommentService: CommentClientService) {}
}
