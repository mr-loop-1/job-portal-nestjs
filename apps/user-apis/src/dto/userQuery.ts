import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class UserQueryDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  role: number;
}
