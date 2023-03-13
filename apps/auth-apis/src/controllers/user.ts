import { Validate } from '@libs/boat/validator';
import { Controller, Get, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { UserRegisterDto } from '../dto/userSignup';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat';
import { UserSignupDto } from '../dto/userSignup';
import { forgotDto } from '../dto/forgot';
import { UserLoginDto } from '../dto/userLogin';
import { resetDto } from '../dto/reset';

@Controller('user')
export class UserController {

    constructor(private readonly authService: AuthService) {};

    @Validate(UserSignupDto)
    @Post('signup')
    async registerUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.addUser(inputs.body);
        return res.success(result);

    }

    @Validate(UserLoginDto)
    @Post('/login')
    async loginCandidate(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.userLogin(inputs.body.email, inputs.body.password, inputs.body.role);
        return res.success(result);

    }

    @Validate(forgotDto)
    @Post('forgot')
    async sendForgetMethod(@Req() input: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.forgotHandler(input.body.email);
        return res.success(result);

    }

    @Validate(resetDto)
    @Post('reset')
    async resetUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {

        const result = await this.authService.resetUser(inputs.body);
        return res.success(result);

    }
}
