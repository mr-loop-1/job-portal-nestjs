import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';

  export class AdminLoginDto {
  @IsNotEmpty()
  @Exists({ table: 'users', column: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}