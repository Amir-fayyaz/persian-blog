import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({ minimum: 3, maximum: 30 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(11)
  @ApiProperty()
  mobile: string;
}
