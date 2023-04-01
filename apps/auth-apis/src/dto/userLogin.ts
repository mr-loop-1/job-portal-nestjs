import {
  Exists,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';
import { ERROR, STATUS } from 'libs/common/constants';

export class UserLoginDto {
  @Exists({ table: 'users', column: 'email', where: { status: STATUS.active } })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20, { message: ERROR.INVALID_CREDENTIALS })
  @IsString()
  @IsNotEmpty()
  password: string;
}
