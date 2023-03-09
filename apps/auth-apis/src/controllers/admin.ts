import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/service';

@Controller()
export class AdminController {

    constructor(private readonly authService: AuthService) {};

    @Get('hello')
    hel() {
        return "in the admin - auth-apis";
    }


    //? If the user is invalid, exception from passport, and route is not invoked at all
    @UseGuards(AuthGuard('local'))          //* Passport automatically invokes the local strategy
    @Post('/auth/login')
    async verify(@Request() req) {          //* Passport attaches a user object (valid) to out incoming request object, that's why we are able to return req.user
        return this.authService.login(req.user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/details')
    async getDetails(@Request() req) {
        return req.user;
    }

    @Post('/register')
    async register(@Body() body) {
        
    }
}
