import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un usuario a partir del DTO
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Obtener todos los usuarios
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar un usuario por correo electrónico
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Buscar un usuario por ID; lanza NotFoundException si no existe
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Actualizar un usuario parcialmente; lanza NotFoundException si no existe
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const userToUpdate = await this.findById(id);
    Object.assign(userToUpdate, data);
    return this.userRepository.save(userToUpdate);
  }

  // Eliminar usuario sin validación de ownership; lanza NotFoundException si no existe
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }

  // Eliminar usuario solo si requesterId coincide con el ID a eliminar
  async deleteUserIfOwner(
    idToDelete: number,
    requesterId: number,
  ): Promise<void> {
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

