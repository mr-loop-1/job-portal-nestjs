import { applyDecorators, UseGuards } from '@nestjs/common';
import { StatusGuard } from '../guards';

export function IsActive() {
  return applyDecorators(UseGuards(StatusGuard));
}
