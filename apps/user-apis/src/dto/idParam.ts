import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class IdParamDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
