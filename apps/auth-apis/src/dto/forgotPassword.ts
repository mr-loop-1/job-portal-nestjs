import { Exists, IsEmail, IsNotEmpty } from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class ForgotPasswordDto {
  @Exists({ table: 'users', column: 'email', where: { status: Status.Active } })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
