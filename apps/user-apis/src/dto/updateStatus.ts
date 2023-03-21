import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsValueFromConfig,
  IsString,
} from '@libs/boat/validator';
import { INVALID_STATUS_UPDATE } from 'libs/common/constants';

export class UpdateStatusDto {
  @IsValueFromConfig(
    { key: 'settings.status' },
    { message: INVALID_STATUS_UPDATE },
  )
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  id: string;
}
