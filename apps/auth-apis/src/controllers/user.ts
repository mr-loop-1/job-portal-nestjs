import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    hel() {
        return "in the user - auth-apis";
    }
}