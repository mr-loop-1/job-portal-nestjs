import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from '@libs/boat/validator';
import { Transform } from 'class-transformer';

export class UpdateJobDto {
  @Length(1, 30)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Length(1, 30)
  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
