import { IsNumber, IsOptional } from '@libs/boat/validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: string;
}
