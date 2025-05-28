import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

async loginWithCredentials(email: string, password: string) {
    console.log("ver variables", email, password);
  const user = await this.usersService.findByEmail(email);

  if (!user || password !== user.password) {
    throw new UnauthorizedException('Credenciales inválidas');
  }
  const payload = { email: user.email, sub: user.id };
  return {
    access_token: this.jwtService.sign(payload),
  };
}

}
