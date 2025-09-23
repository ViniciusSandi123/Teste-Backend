import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { criarUsuarioDto } from '../dtos/criarUsuarioDto';
import { loginDto } from '../dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar')
  @ApiBody({ type: criarUsuarioDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async criarUsuario(@Body() dto: criarUsuarioDto) {
    return this.usuariosService.criarUsuario(dto);
  }

  @Post('login')
  @ApiBody({ type: loginDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: loginDto) {
    const usuario = await this.usuariosService.loginUsuario(dto);
    if (!usuario) {
      return { message: 'Credenciais inválidas' };
    }
    return usuario;
  }

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
