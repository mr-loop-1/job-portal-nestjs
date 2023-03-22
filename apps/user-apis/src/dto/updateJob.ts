import {
  Exists,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants';
import { Status } from 'libs/common/enums';

export class UpdateJobDto {
  @Matches(RegExp(/^(?=.*[a-z]).+/), {
    message: ERROR.INVALID_EXPRESSION,
  })
  @Length(1, 30)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Matches(RegExp(/^(?=.*[a-z]).+/), {
    message: ERROR.INVALID_EXPRESSION,
  })
  @Length(1, 30)
  @IsString()
  @IsOptional()
  location: string;

  @Exists({ table: 'jobs', column: 'ulid', where: { status: Status.Active } })
  @IsString()
  @IsNotEmpty()
  id: string;
}
