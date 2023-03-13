import { IsNotEmpty, IsString, IsUnique } from '@libs/boat/validator';

export class UserSignupDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsUnique({ table: 'users', column: 'email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    skills: string

    @IsNotEmpty()
    mobile_no: string

    @IsNotEmpty()
    //* isFromConfig
    role: number

}