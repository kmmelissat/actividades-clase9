import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Ejercicio 1 - Configuración')
@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener configuración del usuario' })
  @ApiResponse({
    status: 200,
    description:
      'Retorna la configuración personalizada del usuario autenticado',
    schema: {
      type: 'object',
      properties: {
        mensaje: {
          type: 'string',
          example: 'Bienvenido a tu configuración, usuario@ejemplo.com',
        },
        email: { type: 'string', example: 'usuario@ejemplo.com' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  getSettings(@Req() req) {
    return {
      mensaje: `Bienvenido a tu configuración, ${req.user.email}`,
      email: req.user.email,
    };
  }
}
