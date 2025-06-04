import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Ejercicio 2 - Tareas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'Comprar leche' },
      },
    },
    examples: {
      ejemplo: {
        summary: 'Ejemplo de creación de tarea',
        value: { titulo: 'Comprar leche' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
    schema: {
      example: {
        id: 1,
        titulo: 'Comprar leche',
        completada: false,
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  create(@Body() body: { titulo: string }, @Req() req): Promise<Task> {
    return this.tasksService.createTask(body.titulo, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todas las tareas',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'Comprar leche',
          completada: false,
          user: {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@ejemplo.com',
          },
        },
        {
          id: 2,
          titulo: 'Estudiar para el examen',
          completada: true,
          user: {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@ejemplo.com',
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Retorna la tarea',
    schema: {
      example: {
        id: 1,
        titulo: 'Comprar leche',
        completada: false,
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'Comprar pan' },
        completada: { type: 'boolean', example: true },
      },
    },
    examples: {
      ejemplo: {
        summary: 'Ejemplo de actualización de tarea',
        value: { titulo: 'Comprar pan', completada: true },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada exitosamente',
    schema: {
      example: {
        id: 1,
        titulo: 'Comprar pan',
        completada: true,
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@ejemplo.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  update(@Param('id') id: string, @Body() body: Partial<Task>): Promise<Task> {
    return this.tasksService.updateTask(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea eliminada exitosamente',
    schema: {
      example: { mensaje: 'Tarea eliminada correctamente' },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(+id);
  }
}
