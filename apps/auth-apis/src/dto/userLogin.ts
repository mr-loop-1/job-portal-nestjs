import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';

export class UserLoginDto {

    @IsNotEmpty()
    @Exists({ table: 'users', column: 'email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}