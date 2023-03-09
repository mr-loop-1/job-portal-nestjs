import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('yo')
export class AdminController {
  @UseGuards(AuthGuard('./../local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}