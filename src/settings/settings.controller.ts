import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getSettings(@Req() req) {
    return {
      mensaje: `Bienvenido a tu configuración, ${req.user.email}`,
      email: req.user.email,
    };
  }
}
