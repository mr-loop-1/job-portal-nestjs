import {
  Exists,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from '@libs/boat/validator';

export class UserLoginDto {
  @Exists({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
