import {
  Exists,
  IsEmail,
  IsEqualToProp,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';

export class ResetPasswordDto {
  @Exists({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsEqualToProp('newPassword')
  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;

  @Length(4, 4)
  @IsString()
  @IsNotEmpty()
  otp: string;
}
