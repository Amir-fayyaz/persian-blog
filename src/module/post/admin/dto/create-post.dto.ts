import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  ValidateNested,
  IsDefined,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ImageDetailsDto } from './image.dto';
import { subCategoryEntity } from 'src/module/catogory/entities/subCategory.entity';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the post',
    type: String,
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the post',
    type: String,
    required: true,
  })
  description: string;

  // @IsObject()
  @IsDefined()
  // @ValidateNested()
  @Type(() => ImageDetailsDto)
  @ApiProperty({
    description: 'Thumbnail image details',
    type: ImageDetailsDto,
    required: true,
  })
  thumbnail: ImageDetailsDto;

  @IsArray()
  @IsOptional()
  // @ValidateNested({ each: true })
  @Type(() => ImageDetailsDto)
  @ApiProperty({
    description: 'Gallery of images related to the post',
    type: [ImageDetailsDto],
    required: false,
  })
  gallery?: ImageDetailsDto[];

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

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'subcategory id for relation post',
  })
  subcategory: number;

  // @IsOptional()
  // slug: string;

  // @IsOptional()
  // author: AdminEntity;
}
