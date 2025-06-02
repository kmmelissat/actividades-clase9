import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Request,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<User>,
    @Request() req: any,
  ): Promise<User> {
    const requesterId = req.user.sub;
    if (id !== requesterId) {
      throw new ForbiddenException('No puedes modificar otro usuario');
    }
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<{ message: string }> {
    const requesterId = req.user.sub;
    if (id !== requesterId) {
      throw new ForbiddenException('No puedes eliminar otro usuario');
    }
    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}
