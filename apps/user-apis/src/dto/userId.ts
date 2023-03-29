import {
  Exists,
  IsString,
  IsNumber,
  IsOptional,
  IsValueFromConfig,
} from '@libs/boat/validator';
import { Transform } from 'class-transformer';
import { ERROR, ROLE } from 'libs/common/constants';

export class UserIdDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { role: ROLE.candidate },
  })
  @IsString()
  @IsOptional()
  userId: string;

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
