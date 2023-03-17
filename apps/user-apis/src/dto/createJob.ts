import { IsNotEmpty, IsOptional, IsString, Length } from '@libs/boat/validator';

export class CreateJobDto {
  @Length(1, 30)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(1, 100)
  @IsString()
  description: string;

  @Length(1, 30)
  @IsString()
  @IsOptional()
  location: string;
}
