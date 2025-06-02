import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comments.dto';
import { CommentEntity } from './entities/comment.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    private productsService: ProductsService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    // Verificar que el producto existe
    const product = await this.productsService.findOne(
      createCommentDto.productId,
    );
    if (!product) {
      throw new NotFoundException(
        `Producto con ID ${createCommentDto.productId} no encontrado`,
      );
    }

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      product,
    });

    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<CommentEntity[]> {
    return this.commentsRepository.find({
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    return comment;
  }
}
