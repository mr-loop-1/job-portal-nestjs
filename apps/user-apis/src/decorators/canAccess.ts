import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles';
import { JwtAuthGuard } from '../guards/jwt';

export function CanAccess(param?: number) {
  return applyDecorators(
    SetMetadata('role', param),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
