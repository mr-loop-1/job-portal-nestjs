import { Dto, Validate } from '@libs/boat/validator';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminLoginDto } from '../dto/adminLogin';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat'

@Controller('admin')
export class AdminController {

    constructor(private readonly authService: AuthService) { };

    @Get('test')
    test() {
        return "in the ADMIN of auth-apis";
    }

    @Validate(AdminLoginDto)
    @Post('login')
    async verify(@Body() body: AdminLoginDto, @Res() res: Response): Promise<Response> {
        const result = await this.authService.adminLogin(body.email, body.password);
        return res.success(result);
    }

}
