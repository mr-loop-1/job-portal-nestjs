import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
    @Get()
    hel() {
        return "yes it sther";
    }
}
