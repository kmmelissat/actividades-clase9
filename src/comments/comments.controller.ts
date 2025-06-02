import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comments.dto';
import { CommentEntity } from './entities/comment.entity';

@ApiTags('Ejercicio 3A - Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo comentario con puntuación' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Comentario creado exitosamente',
    type: CommentEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (rating 1-5, comentario max 200 chars)',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comentarios con productos',
    type: CommentEntity,
  })
  findAll(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener comentario por ID' })
  @ApiParam({ name: 'id', description: 'ID del comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentario encontrado',
    type: CommentEntity,
  })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CommentEntity> {
    return this.commentsService.findOne(id);
  }
}