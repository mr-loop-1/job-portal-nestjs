import { Exists, IsEmail, IsNotEmpty } from '@libs/boat/validator';
import { STATUS } from 'libs/common/constants';

export class ForgotPasswordDto {
  @Exists({ table: 'users', column: 'email', where: { status: STATUS.active } })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
