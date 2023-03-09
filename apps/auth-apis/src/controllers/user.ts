import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
    @Get('yello')
    hel() {
        return "in the user - auth-apis";
    }
}
