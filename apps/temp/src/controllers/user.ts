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
        if(await this.authService.checkEmail(body.username) === true)
            return {message: 'username already exists'}
        else {
            return this.authService.login(this.authService.addUser(body));
        }
    }

    @Post('/login/candidate')
    @UseGuards(AuthGuard('local'))          //* Passport automatically invokes the local strategy
    async loginCandidate(@Req() req) {          //* Passport attaches a user object (valid) to out incoming request object, that's why we are able to return req.user
        if(req.user.role === 1)
            return this.authService.login(req.user);
        else
            return {message: 'Not a candidate'}
    }

    @Post('/login/recruiter')
    @UseGuards(AuthGuard('local'))
    async loginRecruiter(@Req() req) {
        if(req.user.role === 2) 
            return this.authService.login(req.user);
        else
            return {message: 'Not a recruiter'}
    }


    @Post('forgot')
    async sendForgetMethod(@Body() body) {

    }

    @Post('reset')
    async resetUser(@Body() body) {

        //! Reset user password
    }
}
