import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class UserEntity {}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @OneToMany(() => Task, (task) => task.user)
    tareas: Task[];

}
