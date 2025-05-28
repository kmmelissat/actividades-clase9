import { Product } from 'src/products/entities/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @Column()
  author: string;

  @Column({ type: 'int', width: 1 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;
}