import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ImageDetailsDto {
  @ApiProperty()
  @IsInt()
  position: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullPath: string;
}
