import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
