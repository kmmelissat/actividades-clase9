import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: {email: string, password: string}){
    const user = this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }
}
