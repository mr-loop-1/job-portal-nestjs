import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/service';

@Controller('admin')
export class AdminController {

    constructor(private readonly authService: AuthService) { };

    @Get('test')
    test() {
        return "in the ADMIN of auth-apis";
    }

    @Post('login')
    async verify(@Body() body) {
        return await this.authService.adminLogin(body);
    }

}
