import { IsNotEmpty, IsString } from 'class-validator';

export class readFileDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}
