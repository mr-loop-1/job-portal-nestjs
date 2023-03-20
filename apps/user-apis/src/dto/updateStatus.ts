import { Transform } from 'class-transformer';
import { Status } from 'libs/common/utils/status';
import { IsEnum, IsNotEmpty, IsNumber } from '@libs/boat/validator';

export class UpdateStatusDto {
  @IsEnum(Status)
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
