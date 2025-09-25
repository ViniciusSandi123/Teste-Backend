import { BadRequestException, HttpException, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsuariosService } from '../../modules/Usuarios/services/usuarios.service';
import { loginDto } from '../dtos/loginDto';
import { JwtService } from '@nestjs/jwt';
import { criarUsuarioDto } from '../dtos/criarUsuarioDto';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: loginDto) {
    this.logger.log(`login chamado para email: ${dto.email}`);
    try {
      const usuario = await this.usuariosService.loginUsuario(dto);
      const payload = { sub: usuario.id, email: usuario.email };
      const token = await this.jwtService.signAsync(payload);
      this.logger.log(`Login bem-sucedido para usuário: ${usuario.id}`);
      return { access_token: token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        this.logger.warn(`Falha no login para email: ${dto.email}`);
        throw error;
      }
      this.logger.error(`Erro ao gerar token para email: ${dto.email}`, error.stack);
      throw new BadRequestException('Erro ao obter token');
    }
  }

  async criacaoUsuario(dto: criarUsuarioDto) {
    this.logger.log(`criacaoUsuario chamado para email: ${dto.email}`);
    try {
      const usuario = await this.usuariosService.criarUsuario(dto);
      this.logger.log(`Usuário criado com sucesso: ${usuario.id}`);
      return usuario;
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.warn(`Falha ao criar usuário: ${dto.email}`);
        throw error;
      }
      this.logger.error(`Erro ao criar usuário: ${dto.email}`, error.stack);
      throw new BadRequestException('Erro na criacao do Usuario');
    }
  }
}