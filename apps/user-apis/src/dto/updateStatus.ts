import { IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class UpdateStatusDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
