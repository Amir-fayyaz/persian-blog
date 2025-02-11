import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class EditUserClientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11)
  mobile: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  avatar?: string;
}
