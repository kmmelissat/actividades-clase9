import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) 
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
    ) {}

    async createTask(titulo: string, userId: number): Promise<Task> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        const nueva = this.taskRepository.create({titulo,user});
        return this.taskRepository.save(nueva);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({relations: ['user']});
    }

    async findById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
        return task;
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        const task = await this.findById(id);
        Object.assign(task, data);
        return this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
    }
    
}