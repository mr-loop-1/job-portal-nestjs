import { IsEnum, IsNotEmpty, IsNumber } from '@libs/boat/validator';
import { Status } from 'libs/common/utils/status';

export class UpdateStatusDto {
  @IsEnum(Status)
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
