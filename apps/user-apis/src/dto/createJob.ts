import { IsNotEmpty, IsString, Length } from '@libs/boat/validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;
}
