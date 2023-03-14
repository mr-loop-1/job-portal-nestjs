import { Dto, Validate } from '@libs/boat/validator';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/service';
import { RestController, Request, Response } from '@libs/boat';
import { UserRegisterDto } from '../dto/userRegister';
import { ForgotPasswordDto } from '../dto/forgotPassword';
import { UserLoginDto } from '../dto/userLogin';
import { ResetPasswordDto } from '../dto/resetPassword';
import { UserTransformer } from '../transformers/user';

@Controller('user')
export class UserController extends RestController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Validate(UserRegisterDto)
  @Post('register')
  async registerUser(
    @Dto() inputs: UserRegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.userRegister(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }

  @Validate(UserLoginDto)
  @Post('/login')
  async loginUser(
    @Dto() inputs: UserLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.userLogin(
      inputs.email,
      inputs.password,
    );
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }

  @Validate(ForgotPasswordDto)
  @Post('forgot-password')
  async forgotPassword(
    @Dto() inputs: ForgotPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.forgotPassword(inputs.email);
    return res.success(result);
  }

  @Validate(ResetPasswordDto)
  @Post('reset-password')
  async resetPassword(
    @Dto() inputs: ResetPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.resetPassword(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }
}
