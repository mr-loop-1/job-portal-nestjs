import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUnique } from '@libs/boat/validator';

export class UserRegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUnique({ table: 'users', column: 'email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    skills: string

    @IsNotEmpty()
    @IsString()
    mobileNo: string

    @IsNotEmpty()
    @IsNumber()
    //* isFromConfig
    role: number

}