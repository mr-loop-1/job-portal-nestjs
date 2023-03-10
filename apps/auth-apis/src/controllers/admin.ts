import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from '../dto/roles.decorator';
import { AuthService } from '../services/service';

@Controller('admin')
export class AdminController {

    constructor(private readonly authService: AuthService) {};

    @Get('test')
    test() {
        return "in the ADMIN of auth-apis";
    }


    //? If the user is invalid, exception from passport, and route is not invoked at all
    @UseGuards(AuthGuard('local'))          //* Passport automatically invokes the local strategy
    @Roles(Role.Admin)
    @Post('login')
    async verify(@Request() req) {          //* Passport attaches a user object (valid) to out incoming request object, that's why we are able to return req.user
        if(req.user.role == 3)
            return this.authService.login(req.user);
        else
            return {message: 'Not admin'};
    }

}
