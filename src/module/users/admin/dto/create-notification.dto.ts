import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ImageDetailsDto } from 'src/module/post/admin/dto/image.dto';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  // @IsOptional()
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  thumbnail: ImageDetailsDto;
}
