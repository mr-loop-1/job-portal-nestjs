import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @Exists({ table: 'users', column: 'email' })
  @IsString()
  email: string;
}
