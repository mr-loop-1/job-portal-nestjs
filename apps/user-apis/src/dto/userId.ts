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
import { Status } from 'libs/common/enums';

export class UserIdDto {
  @Exists({
    table: 'users',
    column: 'ulid',
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

  @IsString()
  @IsOptional()
  q: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsValueFromConfig(
    { key: 'settings.validStatus' },
    { message: ERROR.INVALID_STATUS },
  )
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;
}
