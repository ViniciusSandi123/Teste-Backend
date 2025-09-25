import {Injectable,ConflictException,NotFoundException,BadRequestException,UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { criarUsuarioDto } from '../../../auth/dtos/criarUsuarioDto';
import { loginDto } from '../../../auth/dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { UsuarioServiceInterface } from '../interfaces/usuario.service.interface';

@Injectable()
export class UsuariosService implements UsuarioServiceInterface {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(dto: criarUsuarioDto) {
    try {
      const emailExistente = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if (emailExistente) {
        throw new ConflictException('Email já cadastrado');
      }

      const senhaHash = await bcrypt.hash(dto.senha, 10);

      const usuarioCriado = await this.usuarioRepository.criarUsuario({
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      delete (usuarioCriado as any).senha;
      return usuarioCriado;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new BadRequestException('Erro ao criar Usuario');
    }
  }

  async loginUsuario(dto: loginDto) {
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if (!usuario) {
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }

      const comparar = await bcrypt.compare(dto.senha, usuario.senha);
      if (!comparar) {
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }

      delete (usuario as any).senha;
      return usuario;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new BadRequestException('Erro ao fazer login do Usuario');
    }
  }

  async buscarPorId(id: number) {
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao buscar Usuario');
    }
  }

  async obterPerfil(id: number): Promise<perfilUsuarioDto> {
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao obter Perfil');
    }
  }
}