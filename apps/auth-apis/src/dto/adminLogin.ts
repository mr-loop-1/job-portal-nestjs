import { AppConfig } from '@libs/boat';
import {
  Exists,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@libs/boat/validator';

export class AdminLoginDto {
  @Exists({
    table: 'users',
    column: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
