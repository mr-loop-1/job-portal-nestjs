import {
  Exists,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsValueFromConfig,
} from '@libs/boat/validator';
import { Transform } from 'class-transformer';
import { ERROR } from 'libs/common/constants/constants';
import { STATUS } from 'libs/common/constants';

export class JobIdDto {
  @Exists({
    table: 'jobs',
    column: 'ulid',
    where: { status: STATUS.active },
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  perPage: number;

  @IsValueFromConfig(
    { key: 'settings.applications.status' },
    { message: ERROR.INVALID_STATUS },
  )
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;
}
