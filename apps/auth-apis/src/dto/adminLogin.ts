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
    where: { role: 3 },
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
