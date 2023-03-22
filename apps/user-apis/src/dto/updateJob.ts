import {
  Exists,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from '@libs/boat/validator';
import { Transform } from 'class-transformer';
import { Status } from 'libs/common/enums';

export class UpdateJobDto {
  @Length(1, 30)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Length(1, 30)
  @IsString()
  @IsOptional()
  location: string;

  @Exists({ table: 'jobs', column: 'ulid', where: { status: Status.Active } })
  @IsString()
  @IsNotEmpty()
  id: string;
}
