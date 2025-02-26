import { Controller } from '@nestjs/common';
import { CommentClientService } from '../services/comment.client.service';

@Controller('api/v1/client/comment')
export class CommentClientController {
  constructor(private readonly CommentService: CommentClientService) {}
}
