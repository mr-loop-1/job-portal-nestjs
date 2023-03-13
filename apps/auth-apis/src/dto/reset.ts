import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';

export class resetDto {

    @IsNotEmpty()
    @Exists({ table: 'users', column: 'email' })
    email: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    otp: string

}