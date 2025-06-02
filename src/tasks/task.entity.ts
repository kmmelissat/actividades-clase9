import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ default: false })
    completada: boolean;

   // @ManyToOne(() => User, (user) => user.tareas, {eager: true })
   // user: User;

    @Column()
    userId: number;
}
