import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpClientDto {
  @IsString()
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;
}
