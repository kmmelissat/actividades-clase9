import { IsString, IsInt, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario (máximo 200 caracteres)',
    example: 'Excelente producto, muy recomendado. La calidad es increíble.',
    maxLength: 200,
    minLength: 1,
  })
  @IsString()
  @Length(1, 200, {
    message: 'El comentario debe tener entre 1 y 200 caracteres',
  })
  content: string;

  @ApiProperty({
    description: 'Nombre del autor del comentario',
    example: 'Juan Pérez',
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Puntuación del producto (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  rating: number;

  @ApiProperty({
    description: 'ID del producto a comentar',
    example: 1,
  })
  @IsInt()
  productId: number;
}