import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsValueFromConfig,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants/constants';

export class GetUsersDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  role: number;

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
    { key: 'settings.applications.status' },
    { message: ERROR.INVALID_STATUS },
  )
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;
}
