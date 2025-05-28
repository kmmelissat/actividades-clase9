import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly user = {
    userId: 1,
    username: 'admin',
    password: '1234',
  };

  async validateUser(username: string, password: string): Promise<any> {
    if (username === this.user.username && password === this.user.password) {
      const { password, ...result } = this.user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
