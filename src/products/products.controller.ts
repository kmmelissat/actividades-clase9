import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-products.dto';
import { Product } from './entities/products.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Ejercicio 5 - Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos',
    schema: {
      example: [
        {
          id: 1,
          name: 'Laptop',
          description: 'Portátil de alto rendimiento',
          price: 1200.5,
        },
        {
          id: 2,
          name: 'Mouse',
          description: 'Mouse inalámbrico',
          price: 25.99,
        },
      ],
    },
  })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Teclado' },
        description: {
          type: 'string',
          example: 'Teclado mecánico retroiluminado',
        },
        price: { type: 'number', example: 89.99 },
      },
    },
    examples: {
      ejemplo: {
        summary: 'Ejemplo de creación de producto',
        value: {
          name: 'Teclado',
          description: 'Teclado mecánico retroiluminado',
          price: 89.99,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    schema: {
      example: {
        id: 3,
        name: 'Teclado',
        description: 'Teclado mecánico retroiluminado',
        price: 89.99,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token JWT inválido o faltante',
  })
  async create(
    @Body() product: CreateProductDto,
    @Request() req: any,
  ): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto',
    schema: {
      example: {
        id: 1,
        name: 'Laptop',
        description: 'Portátil de alto rendimiento',
        price: 1200.5,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }
}
