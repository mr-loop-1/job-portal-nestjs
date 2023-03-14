import { Dto, Validate } from '@libs/boat/validator';
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
  }

  @Validate(UserRegisterDto)
  @Post('register')
  async registerUser(
    @Dto() inputs: UserRegisterDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.addUser(inputs);
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

  @Validate(forgotPasswordDto)
  @Post('forgot-password')
  async forgotPassword(
    @Dto() inputs: forgotPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.forgotPasswordHandler(inputs.email);
    return res.success(result);
  }

  @Validate(resetPasswordDto)
  @Post('reset-password')
  async resetPassword(
    @Dto() inputs: resetPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.resetUser(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }
}
