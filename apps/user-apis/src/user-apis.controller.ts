import { Controller, Get } from '@nestjs/common';
import { UserApisService } from './user-apis.service';

@Controller()
export class UserApisController {
  constructor(private readonly userApisService: UserApisService) {}

  @Get()
  getHello(): string {
    return this.userApisService.getHello();
  }
}
