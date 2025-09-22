import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Post()
  criarUsuario(@Body() user: Partial<Usuario>): Usuario {
    return this.usersService.create(user);
  }

  @Get()
  retornaTodosUsuarios(): Usuario[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  retornaUsuariosPorId(@Param('id') id: string): Usuario | undefined {
    return this.usersService.findById(Number(id));
  }
}
