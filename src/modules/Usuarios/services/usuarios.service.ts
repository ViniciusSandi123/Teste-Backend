import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { criarUsuarioDto } from '../dtos/criarUsuarioDto';
import { loginDto } from '../dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { UsuarioServiceInterface } from '../interfaces/usuario.service.interface';
import { create } from 'domain';

@Injectable()
export class UsuariosService implements UsuarioServiceInterface{
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criarUsuario(dto: criarUsuarioDto) {
    const emailExistente = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
    if(emailExistente){
      throw new ConflictException("Email já cadastrado");
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
  }

  async loginUsuario(dto: loginDto){
    const usuario = await this.usuarioRepository.retornaUsuarioPorEmail(dto.email);
    if(!usuario){
      return null;
    }

    const comparar = await bcrypt.compare(dto.senha, usuario.senha);
    if(!comparar){
      return null;
    }

    return usuario;
  }

  async buscarPorId(id: number){
    return this.usuarioRepository.retornaUsuarioPorId(id);
  }

  async obterPerfil(id: number): Promise<perfilUsuarioDto>{
    const usuario = await this.usuarioRepository.retornaUsuarioPorId(id);
    if (!usuario){
      throw new NotFoundException('Usuário não encontrado');
    }
    return {id: usuario.id, nome: usuario.nome, email: usuario.email};
  }

}
