import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserLibService } from '@lib/users';
import { ERROR } from 'libs/common/constants';
import { IUser } from 'libs/common/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserLibService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.secret'),
    });
  }

  async validate(payload: IUser): Promise<IUser> {
    console.log('saddd');
    const user = await this.userService.repo.firstWhere({
      id: payload.id,
    });
    console.log(user, payload);

    if (user.status !== this.config.get('settings.user.status.active')) {
      throw new UnauthorizedException(ERROR.DELETED_USER);
    }

    console.log(user.passwordUpdatedAt, payload.passwordUpdatedAt);

    if (
      new Date(user.passwordUpdatedAt) > new Date(payload.passwordUpdatedAt)
    ) {
      throw new UnauthorizedException(ERROR.UNAUTHORIZED);
    }
    return user;
  }
}
