import { Controller, Get } from '@nestjs/common';

@Controller()
export class ControlPanelController {
  constructor() {}

  @Get()
  hel() {
    return "asdfsdg";
  }
}
