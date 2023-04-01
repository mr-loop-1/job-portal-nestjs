import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUnique,
  IsMobilePhone,
  IsValueFromConfig,
  IsEmail,
  Length,
  IsAlpha,
  Matches,
} from '@libs/boat/validator';
import { ERROR } from 'libs/common/constants';

export class UserRegisterDto {
  @Matches(RegExp(/^(?=.*([a-z]|[A-Z])).+/), {
    message: ERROR.INVALID_EXPRESSION,
  })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUnique({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  skills: string;

  @IsMobilePhone('en-IN', {}, { message: ERROR.INVALID_PHONE_NUMBER })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsValueFromConfig(
    { key: 'settings.role.user' },
    { message: ERROR.INVALID_REGISTER },
  )
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
