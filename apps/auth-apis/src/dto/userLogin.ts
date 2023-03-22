import {
  Exists,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';
import { Status } from 'libs/common/enums';

export class UserLoginDto {
  @Exists({ table: 'users', column: 'email', where: { status: Status.Active } })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
