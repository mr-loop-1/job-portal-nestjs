import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/service';

@Controller('user')
export class UserController {

    constructor(private readonly authService: AuthService) {};

    @Get()
    test() {
        return "In the USER of auth-apis";
    }

    @Post('signup')
    async registerUser(@Body() body) {
        return await this.authService.addUser(body);
    }

    @Post('/login')
    async loginCandidate(@Body() body) {
        return await this.authService.userLogin(body.email, body.password, body.role);
    }

    @Post('forgot')
    async sendForgetMethod(@Body() body) {
        return await this.authService.forgotHandler(body.email);
    }

    @Post('reset')
    async resetUser(@Body() body) {
        /** body
         * email
         * new password
         * 
         */
        return await this.authService.resetUser(body);
    }
}
