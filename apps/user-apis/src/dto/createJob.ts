import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants';

export class CreateJobDto {
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
}
