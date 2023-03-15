import { Controller, Post, Req, Res } from '@nestjs/common';
import { RestController, Request, Response } from '@libs/boat';
import { Dto, Validate } from '@libs/boat/validator';
import { AuthService } from '../services/service';
import { UserTransformer } from '../transformers/user';
import { AdminLoginDto } from '../dto/index';

@Controller('admin')
export class AdminController extends RestController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Validate(AdminLoginDto)
  @Post('login')
  async adminLogin(
    @Dto() inputs: AdminLoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.adminLogin(inputs);
    return res.success(
      await this.transform(result, new UserTransformer(), { req }),
    );
  }
}
