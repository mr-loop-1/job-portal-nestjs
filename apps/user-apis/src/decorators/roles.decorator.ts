import { SetMetadata } from '@nestjs/common';

export enum Role {
    Candidate = 1,
    Recruiter = 2,
    Admin = 3,
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);