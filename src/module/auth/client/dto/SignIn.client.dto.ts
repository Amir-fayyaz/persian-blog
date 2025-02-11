import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignInClientDto {
  @IsString()
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsString()
  @Length(5, 5)
  @IsNotEmpty()
  @ApiProperty()
  otpCode: string;
}
