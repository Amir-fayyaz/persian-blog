import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignInClientDto {
  @IsString()
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @Length(5, 5)
  @IsNotEmpty()
  otpCode: string;
}
