import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.CreateUser(dto.nombre, dto.email, dto.password);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById((+id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario'})
    update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario'})
    delete(@Param('id') id: string): Promise<void> {    
        return this.usersService.deleteUser(+id);
    }
    
}
