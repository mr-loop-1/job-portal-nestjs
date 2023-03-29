import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsValueFromConfig,
  Exists,
} from '@libs/boat/validator';
import { ERROR, ROLE } from 'libs/common/constants/constants';

export class GetJobsDto {
  @Exists({
    table: 'users',
    column: 'ulid',
    where: { role: ROLE.recruiter },
  })
  @IsString()
  @IsOptional()
  userId: string;

  @IsValueFromConfig(
    { key: 'settings.applications.status' },
    { message: ERROR.INVALID_STATUS },
  )
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;

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
}
