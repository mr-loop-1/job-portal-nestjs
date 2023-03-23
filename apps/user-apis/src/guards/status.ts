import { UserLibService } from '@lib/users';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { STATUS } from 'libs/common/constants/constants';

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(private readonly userService: UserLibService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.repo.firstWhere({
      ulid: request.user?.ulid,
    });

    if (user.status !== STATUS.active) {
      throw new UnauthorizedException('User Deleted, Please contact admin');
    }

    return true;
  }
}
