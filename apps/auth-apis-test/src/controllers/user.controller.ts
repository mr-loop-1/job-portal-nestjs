import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    hel() {
        return "yes it sther";
    }
}
