import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    console.log('required role = ', requiredRoles);
    console.log('request.user = ', request?.user);
    return requiredRoles === request?.user?.role;
  }
}
