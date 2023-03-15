import { AppConfig } from '@libs/boat/utils/config';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUnique,
  IsMobilePhone,
  IsValueFromConfig,
  IsEmail,
  MinLength,
} from '@libs/boat/validator';
import {
  INVALID_ADMIN_REGISTER,
  INVALID_PHONE_NUMBER,
} from 'libs/common/constants';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUnique({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  skills: string;

  @IsMobilePhone('en-IN', {}, { message: INVALID_PHONE_NUMBER })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsValueFromConfig(
    { key: 'settings.role.user' },
    { message: INVALID_ADMIN_REGISTER },
  )
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
