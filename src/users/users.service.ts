import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    create(createUserDto: CreateUserDto): Promise<User>{
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    findAll(): Promise<User[]>{
        return this.userRepository.find();
    }
    async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
    }
    
    async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }
    return this.userRepository.remove(user);
    }


    async deleteUserIfOwner(idToDelete: number, requesterId: number): Promise<void> {
        if (idToDelete !== requesterId) {
        throw new ForbiddenException('No puedes eliminar a otro usuario');
    }

    const user = await this.userRepository.findOne({ where: { id: idToDelete } });
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.delete(idToDelete);
}



}
