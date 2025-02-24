import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ImageDetailsDto } from './image.dto';
import { Type } from 'class-transformer';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDefined()
  @Type(() => ImageDetailsDto)
  @ApiProperty({
    description: 'Thumbnail image details',
    type: ImageDetailsDto,
    required: true,
  })
  thumbnail: ImageDetailsDto;

  @IsArray()
  @IsDefined()
  @Type(() => ImageDetailsDto)
  @ApiProperty({
    description: 'Gallery of images related to the post',
    type: [ImageDetailsDto],
    required: false,
  })
  gallery: ImageDetailsDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    each: true,
    message:
      'Each tag must only contain letters, numbers, hyphens, or underscores.',
  })
  @ApiProperty({
    description:
      'Array of tags related to the post. Tags can only contain letters, numbers, hyphens, and underscores.',
    type: [String],
  })
  tags: string[];
}
