import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Usuarios } from '../entities/usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Post()
  criarUsuario(@Body() user: Partial<Usuarios>): Usuarios {
    return this.usersService.create(user);
  }

  @Get()
  retornaTodosUsuarios(): Usuarios[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  retornaUsuariosPorId(@Param('id') id: string): Usuarios | undefined {
    return this.usersService.findById(Number(id));
  }
}
