import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    // First validate credentials
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Perform login (generate token, etc.)
    const loginResult = await this.authService.login(user);

    // Return token plus a custom welcome message
    return {
      ...loginResult,
      mensaje: `Bienvenido a tu configuración, ${user.email}`,
      email: user.email,
    };
  }
}
