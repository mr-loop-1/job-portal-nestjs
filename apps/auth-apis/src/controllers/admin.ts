import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AdminController {
    @Get('hello')
    hel() {
        return "in the admin - auth-apis";
    }

    @UseGuards(AuthGuard('local'))
    @Post('/auth/login')
    async verify(@Request() req) {
        return req.user;
    }
}
