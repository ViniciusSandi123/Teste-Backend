import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { criarUsuarioDto } from '../../../auth/dtos/criarUsuarioDto';
import { loginDto } from '../../../auth/dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':id')
  async buscarPorId(@Param('id') id: number) {
    const usuario = this.usuariosService.buscarPorId(id);
    if(!usuario){
      return { message: 'Usuario não encontrado' };
    }
    return usuario;
  }

  @Get('perfil/:id')
  async obterPerfil(@Param('id') id: number): Promise<perfilUsuarioDto> {
    const usuario = this.usuariosService.obterPerfil(id);
    if(!usuario){
      throw new NotFoundException('Perfil não encontrado');
    }
    return usuario;
  }
}
