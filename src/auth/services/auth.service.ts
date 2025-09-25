import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    try {
      const usuario = await this.usuariosService.loginUsuario(dto);
      const payload = { sub: usuario.id, email: usuario.email };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new BadRequestException('Erro ao obter token');
    }
  }

  async criacaoUsuario(dto: criarUsuarioDto) {
    try {
      return await this.usuariosService.criarUsuario(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new BadRequestException('Erro na criacao do Usuario');
    }
  }
}
