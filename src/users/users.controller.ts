import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();

  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() req: any,) {    
    const requesterId = req.user.sub
    if (id !== requesterId) {
      throw new ForbiddenException('No puedes eliminar otro usuario');
    }

    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado correctamente' };
  }


}
