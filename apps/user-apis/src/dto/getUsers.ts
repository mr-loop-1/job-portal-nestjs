import { Transform } from 'class-transformer';
import { Exists, IsNotEmpty, IsNumber } from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class GetUsersDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  role: number;
}
