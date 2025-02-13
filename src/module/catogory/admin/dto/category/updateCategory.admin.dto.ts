import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  title: string;
}
