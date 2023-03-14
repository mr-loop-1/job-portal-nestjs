import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUnique,
  IsMobilePhone,
  IsValueFromConfig,
} from '@libs/boat/validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUnique({ table: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  skills: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('en-IN', {}, { message: 'Invalid phone number' })
  mobileNo: string;

  @IsNotEmpty()
  @IsNumber()
  @IsValueFromConfig({ key: 'settings.role.user' })
  role: number;
}
