import { Exists, IsNotEmpty, IsString } from '@libs/boat/validator';

export class forgotPasswordDto {

    @IsNotEmpty()
    @Exists({ table: 'users', column: 'email' })
    @IsString()
    email: string;

}