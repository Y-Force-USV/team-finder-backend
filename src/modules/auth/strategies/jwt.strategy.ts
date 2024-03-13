import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      seccretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(playload: any) {
    return { userId: playload.sub, username: playload.username, role: playload.role };
  }
}
