import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfig } from '@libs/boat';
import { pick } from 'lodash';

//? This is invoked on login requests, which contain a JWST token already

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
    return pick(payload, ['id', 'name', 'role']);
  }
}
