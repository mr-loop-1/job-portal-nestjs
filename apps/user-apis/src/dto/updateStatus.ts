import { IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class UpdateJobDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
