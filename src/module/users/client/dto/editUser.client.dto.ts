import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class EditUserClientDto {
  @IsString()
  @IsNotEmpty()
  @Length(11)
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  avatar: string;
}
