import { Exists, IsEmail, IsNotEmpty } from '@libs/boat/validator';

export class ForgotPasswordDto {
  @Exists({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
