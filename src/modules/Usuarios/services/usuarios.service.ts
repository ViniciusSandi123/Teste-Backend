import { Injectable, ConflictException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { criarUsuarioDto } from '../../../auth/dtos/criarUsuarioDto';
import { loginDto } from '../../../auth/dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { UsuarioServiceInterface } from '../interfaces/usuario.service.interface';
import { create } from 'domain';

@Injectable()
export class UsuariosService implements UsuarioServiceInterface{
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(dto: criarUsuarioDto) {
    try {
      const emailExistente = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if(emailExistente){
        return {message: 'Email já cadastrado'};
      }
      const salts = 10;
      const senhaHash = await bcrypt.hash(dto.senha, salts);
      
      const usuarioCriado = await this.usuarioRepository.criarUsuario({
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });
  
      delete(create as any).senha;
      return usuarioCriado;
    } catch (Erro) {
      throw new BadRequestException('Erro ao criar Usuario');
    }
  }

  async loginUsuario(dto: loginDto){
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
      if(!usuario){
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }
  
      const comparar = await bcrypt.compare(dto.senha, usuario.senha);
      if(!comparar){
        throw new UnauthorizedException('Usuario ou senha incorretos');
      }
  
      return usuario;
    } catch (Erro) {
      throw new BadRequestException('Erro ao fazer login do Usuario');
    }
  }

  async buscarPorId(id: number){
    try {
      const retorno = this.usuarioRepository.retornaUsuarioPorId(id);
      return retorno;

    } catch (Erro) {
      throw new BadRequestException('Erro ao buscar Usuario');
    }
  }

  async obterPerfil(id: number): Promise<perfilUsuarioDto>{
    try {
      const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
      return {id: usuario.id, nome: usuario.nome, email: usuario.email};
    } catch (Erro) {
      throw new BadRequestException('Erro ao obter Perfil');
    }
  }
}
