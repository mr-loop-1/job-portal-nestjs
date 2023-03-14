import { Dto, Validate } from '@libs/boat/validator';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AdminLoginDto } from '../dto/adminLogin';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat';
import { UserTransformer } from '../transformers/user';

@Controller('admin')
export class AdminController extends RestController {

    constructor(private readonly authService: AuthService) { 
        super();
    };

    @Validate(AdminLoginDto)
    @Post('login')
    async adminLogin(@Req() inputs: Request, @Res() res: Response): Promise<Response> {

        const result = await this.authService.adminLogin(inputs.body.email, inputs.body.password);
        return res.success(await this.transform(result, new UserTransformer, { inputs }))

    }

}
