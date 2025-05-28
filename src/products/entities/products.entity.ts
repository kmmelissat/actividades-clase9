import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => CommentEntity, (comment) => comment.product)
  comments: CommentEntity[];
}