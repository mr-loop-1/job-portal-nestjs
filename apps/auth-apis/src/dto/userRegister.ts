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

  @IsMobilePhone('en-IN', {}, { message: 'Invalid phone number' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsValueFromConfig({ key: 'settings.role.user' }, { message: 'const error' })
  @IsNumber()
  @IsNotEmpty()
  role: number;
}
