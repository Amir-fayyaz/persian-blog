import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-Comment.dto';
export class CreateReplyDto extends PartialType(CreateCommentDto) {}
