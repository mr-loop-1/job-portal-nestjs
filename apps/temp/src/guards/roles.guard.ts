import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from '../dto/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // console.log(requiredRoles)
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        console.log(request)
        // console.log(request.body.role, requiredRoles[0]);
        console.log(request.user);
        return requiredRoles[0] == request.body.role;
    }
}