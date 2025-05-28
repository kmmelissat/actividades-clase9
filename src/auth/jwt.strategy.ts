import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'clave-secreta'
    });
  }

  async validate(payload: any) {
    // Aquí puedes devolver lo que quieras adjuntar al request.user
    return { userId: payload.sub, email: payload.email };
  }
}
