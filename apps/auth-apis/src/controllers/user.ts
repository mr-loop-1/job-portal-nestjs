import { Controller, Get } from '@nestjs/common';
import { UserApisService } from '../services';

@Controller()
export class UserApiController {
  constructor(private readonly authApisService: UserApisService) {}

  @Get()
  getHello(): string {
    return this.authApisService.getHello();
  }
}
