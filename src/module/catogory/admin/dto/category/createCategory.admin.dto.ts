import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({ description: 'title of category', maxLength: 25 })
  title: string;
}
