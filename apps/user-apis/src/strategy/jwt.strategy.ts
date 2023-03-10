import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfig } from '@libs/boat';

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

    //* Incomplete currently
    //* here validate the userId and password and check with whitelists

    return { userId: payload.sub, username: payload.username };
  }
}