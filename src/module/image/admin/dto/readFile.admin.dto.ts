import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class readFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'full path of image' })
  path: string;
}
