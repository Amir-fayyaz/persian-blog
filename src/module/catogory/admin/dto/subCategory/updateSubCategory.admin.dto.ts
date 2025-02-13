import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty()
  title: string;
}
