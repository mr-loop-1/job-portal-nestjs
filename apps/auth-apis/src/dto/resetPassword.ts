import {
  Exists,
  IsEmail,
  IsEqualToProp,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class ResetPasswordDto {
  @Exists({ table: 'users', column: 'email', where: { status: Status.Active } })
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
