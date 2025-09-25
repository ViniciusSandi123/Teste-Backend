import { Injectable, ConflictException, NotFoundException, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { criarUsuarioDto } from '../../../auth/dtos/criarUsuarioDto';
import { loginDto } from '../../../auth/dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { UsuarioServiceInterface } from '../interfaces/usuario.service.interface';

@Injectable()
export class UsuariosService implements UsuarioServiceInterface {
  private readonly logger = new Logger(UsuariosService.name);
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(dto: criarUsuarioDto) {
    this.logger.log('criarUsuario chamado');
    try {
      const emailExistente = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if (emailExistente) {
        this.logger.warn(`Tentativa de criar usuário com email já existente: ${dto.email}`);
        throw new ConflictException('Email já cadastrado');
      }

      const senhaHash = await bcrypt.hash(dto.senha, 10);
      const usuarioCriado = await this.usuarioRepository.criarUsuario({
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      delete (usuarioCriado as any).senha;
      this.logger.log(`Usuário criado com sucesso: ${usuarioCriado.id}`);
      return usuarioCriado;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      this.logger.error('Erro ao criar usuário', error.stack);
      throw new BadRequestException('Erro ao criar Usuario');
    }
  }

  async loginUsuario(dto: loginDto) {
    this.logger.log(`loginUsuario chamado: ${dto.email}`);
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if (!usuario) {
        this.logger.warn(`Login falhou, usuário não encontrado: ${dto.email}`);
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }

      const comparar = await bcrypt.compare(dto.senha, usuario.senha);
      if (!comparar) {
        this.logger.warn(`Login falhou, senha incorreta para usuário: ${dto.email}`);
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }

      delete (usuario as any).senha;
      this.logger.log(`Login realizado com sucesso: ${usuario.id}`);
      return usuario;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error(`Erro ao realizar login: ${dto.email}`, error.stack);
      throw new BadRequestException('Erro ao fazer login do Usuario');
    }
  }

  async buscarPorId(id: number) {
    this.logger.log(`buscarPorId chamado: ${id}`);
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
      if (!usuario) {
        this.logger.warn(`Usuário não encontrado: ${id}`);
        throw new NotFoundException('Usuário não encontrado');
      }
      this.logger.log(`Usuário encontrado: ${id}`);
      return usuario;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Erro ao buscar usuário: ${id}`, error.stack);
      throw new BadRequestException('Erro ao buscar Usuario');
    }
  }

  async obterPerfil(id: number): Promise<perfilUsuarioDto> {
    this.logger.log(`obterPerfil chamado: ${id}`);
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
      if (!usuario) {
        this.logger.warn(`Perfil não encontrado para usuário: ${id}`);
        throw new NotFoundException('Usuário não encontrado');
      }
      this.logger.log(`Perfil obtido com sucesso: ${id}`);
      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Erro ao obter perfil: ${id}`, error.stack);
      throw new BadRequestException('Erro ao obter Perfil');
    }
  }
}