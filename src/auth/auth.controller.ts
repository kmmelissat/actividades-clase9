import { Body, Controller, UnauthorizedException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: {email: string, password: string}) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) throw new UnauthorizedException();
        const loginResult = await this.authService.login(user);
        return {
            ...loginResult,
            mensaje: `Bienvenido a tu configuración, ${user.email}`,
            email: user.email,
        };
    }
}
