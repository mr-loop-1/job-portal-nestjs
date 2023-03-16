import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { AppConfig } from '@libs/boat';
import { pick } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'simplysimplysecretcomplexcomplexsecret',
    });
  }

  async validate(payload: any) {
    console.log('destructured user ', payload);
    return {
      id: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  }
}
