import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

<<<<<<< HEAD
export class CreateCommentDto {
=======
export class CreatecommentDto {
>>>>>>> 490f1bc8f74ca77608be15cfd3d8078d0cbfebb1
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
