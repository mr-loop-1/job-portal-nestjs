import { Validate } from '@libs/boat/validator';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat';
import { UserRegisterDto } from '../dto/userRegister';
import { forgotPasswordDto } from '../dto/forgotPassword';
import { UserLoginDto } from '../dto/userLogin';
import { resetPasswordDto } from '../dto/resetPassword';
import { UserTransformer } from '../transformers/user';

@Controller('user')
export class UserController extends RestController {

    constructor(private readonly authService: AuthService) {
        super();
    };

    @Validate(UserRegisterDto)
    @Post('register')
    async registerUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.addUser(inputs.body);
        return res.success(await this.transform(result, new UserTransformer, { inputs }));

    }

    @Validate(UserLoginDto)
    @Post('/login')
    async loginUser(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.userLogin(inputs.body.email, inputs.body.password);
        return res.success(await this.transform(result, new UserTransformer, { inputs }));

    }

    @Validate(forgotPasswordDto)
    @Post('forgot-password')
    async forgotPassword(@Req() input: Request, @Res() res: Response) : Promise<Response> {
        
        const result = await this.authService.forgotPasswordHandler(input.body.email);
        return res.success(result);

    }

    @Validate(resetPasswordDto)
    @Post('reset-password')
    async resetPassword(@Req() inputs: Request, @Res() res: Response) : Promise<Response> {

        const result = await this.authService.resetUser(inputs.body);
        return res.success(await this.transform(result, new UserTransformer, { inputs }));;

    }
}
