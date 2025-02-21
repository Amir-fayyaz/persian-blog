import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'full path of image you want to delete' })
  path: string;
}
