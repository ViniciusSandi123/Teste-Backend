import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRepositoryInterface } from '../interfaces/usuario.repository.interface'

@Injectable()
export class UsuarioRepository implements UsuarioRepositoryInterface{

    constructor(
        @InjectRepository(Usuario) 
        private readonly repo: Repository<Usuario>
    ){}

    async criarUsuario(data: Partial<Usuario>){
        const usuario = this.repo.create(data);
        return await this.repo.save(usuario);
    }

    async retornaUsuarioPorId(id: number) {
        const retorno = await this.repo.findOne({ where: {id}});
        if(retorno === null){
            throw new NotFoundException('Usuário não encontrado');
        }
        return retorno
    }

    async retornaUsuarioPorEmail(email: string){
        return await this.repo.findOne({ where: { email } }) ?? null;
    }
}