import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async CreateUser(nombre: string, email: string, password: string): Promise<User> {
        const user = this.userRepository.create({ nombre, email, password });
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const userToUpdate = await this.findById(id);
        Object.assign(userToUpdate, data);
        return this.userRepository.save(userToUpdate);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
}