import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from '@libs/boat/validator';

export class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  role: number;
}
