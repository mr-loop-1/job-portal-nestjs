import { Validate } from '@libs/boat/validator';
import { Controller, Get, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { UserRegisterDto } from '../dto/userSignup';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat';
import { UserRegisterDto } from '../dto/userRegister';
import { forgotPasswordDto } from '../dto/forgotPassword';
import { UserLoginDto } from '../dto/userLogin';
import { resetPasswordDto } from '../dto/resetPassword';

@Controller('user')
export class UserController {

    constructor(private readonly authService: AuthService) {};

    @Validate(UserRegisterDto)
    @Post('register')
    async registerUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.addUser(inputs.body);
        return res.success(result);

    }

    @Validate(UserLoginDto)
    @Post('/login')
    async loginUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.userLogin(inputs.body.email, inputs.body.password);
        return res.success(result);

    }

    @Validate(forgotPasswordDto)
    @Post('forgot-password')
    async forgotPassword(@Req() input: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.forgotPasswordHandler(input.body.email);
        return res.success(result);

    }

    @Validate(resetPasswordDto)
    @Post('reset-password')
    async resetPassword(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {

        const result = await this.authService.resetUser(inputs.body);
        return res.success(result);

    }
}
