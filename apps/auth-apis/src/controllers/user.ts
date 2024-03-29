import { RestController, Request, Response } from '@libs/boat';
import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Dto, Validate } from '@libs/boat/validator';
import { UserTransformer } from 'libs/common/transformers';
import { AuthService } from '../services';
import {
  UserRegisterDto,
  ForgotPasswordDto,
  UserLoginDto,
  ResetPasswordDto,
} from '../dto';

@Controller('user/auth')
export class UserController extends RestController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Validate(UserRegisterDto)
  @Post('register')
  async userRegister(
    @Dto() inputs: UserRegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.userRegister(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
      'Registration Success',
      HttpStatus.CREATED,
    );
  }

  @Validate(UserLoginDto)
  @Post('/login')
  async userLogin(
    @Dto() inputs: UserLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.userLogin(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }

  @Validate(ForgotPasswordDto)
  @Post('forgot-password')
  async forgotPassword(
    @Dto() inputs: ForgotPasswordDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.forgotPassword(inputs);
    return res.success(result);
  }

  @Validate(ResetPasswordDto)
  @Post('reset-password')
  async resetPassword(
    @Dto() inputs: ResetPasswordDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.resetPassword(inputs);
    return res.success(result);
  }
}
