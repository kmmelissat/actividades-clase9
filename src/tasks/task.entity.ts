import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ default: false })
    completada: boolean;

    @ManyToMany(() => User, (user) => user.tareas, {eager: true })
    user: User;
}
