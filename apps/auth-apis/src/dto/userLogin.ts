import {
  Exists,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';
import { STATUS } from 'libs/common/constants';

export class UserLoginDto {
  @Exists({ table: 'users', column: 'email', where: { status: STATUS.active } })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
