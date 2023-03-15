import { AppConfig } from '@libs/boat';
import {
  Exists,
  IsEmail,
  IsEqualToProp,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from '@libs/boat/validator';

export class ResetPasswordDto {
  @Exists({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsEqualToProp('newPassword')
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;

  @Length(8, 8)
  @IsString()
  @IsNotEmpty()
  otp: string;
}
