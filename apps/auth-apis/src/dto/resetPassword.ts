import {
  Exists,
  IsEmail,
  IsEqualToProp,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';
import { STATUS } from 'libs/common/constants';

export class ResetPasswordDto {
  @Exists({ table: 'users', column: 'email', where: { status: STATUS.active } })
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
