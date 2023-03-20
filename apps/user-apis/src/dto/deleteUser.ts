import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class DeleteUserDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  role: number;
}
