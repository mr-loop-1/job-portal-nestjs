import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUnique,
  IsMobilePhone,
  IsValueFromConfig,
  IsEmail,
  Length,
  IsAlphanumeric,
  IsAlpha,
} from '@libs/boat/validator';
import {
  INVALID_ADMIN_REGISTER,
  INVALID_PHONE_NUMBER,
} from 'libs/common/constants';

export class UserRegisterDto {
  @IsAlpha()
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

  @IsMobilePhone('en-IN', {}, { message: INVALID_PHONE_NUMBER })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsValueFromConfig(
    { key: 'settings.role.user' },
    { message: INVALID_ADMIN_REGISTER }, //! change error message
  )
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
