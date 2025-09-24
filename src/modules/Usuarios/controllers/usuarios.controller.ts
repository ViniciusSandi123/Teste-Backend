import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
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
