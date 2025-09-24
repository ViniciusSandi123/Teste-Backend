import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../../modules/Usuarios/services/usuarios.service';
import { loginDto } from '../dtos/loginDto';
import { JwtService } from '@nestjs/jwt';
import { criarUsuarioDto } from 'src/auth/dtos/criarUsuarioDto';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: loginDto) {
    const usuario = await this.usuariosService.loginUsuario(dto);
    if (!usuario) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: usuario.id, email: usuario.email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async criacaoUsuario(dto: criarUsuarioDto) {
    return this.usuariosService.criarUsuario(dto);
  }
}
