import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.enity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  criarUsuario(@Body() user: Partial<User>): User {
    return this.usersService.create(user);
  }

  @Get()
  retornaTodosUsuarios(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  retornaUsuariosPorId(@Param('id') id: string): User | undefined {
    return this.usersService.findById(Number(id));
  }
}
