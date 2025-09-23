import { Injectable } from '@nestjs/common';
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
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }

    async retornarTodosUsuarios(): Promise<Usuario[]> {
        return await this.repo.find();
    }

    async retornaUsuarioPorId(id: number) {
        return await this.repo.findOne({ where: {id}}) ?? null;
    }

    async retornaUsuarioPorEmail(email: string){
        return await this.repo.findOne({ where: { email } }) ?? null;
    }

    async alterarUsuario(id: number, data: Partial<Usuario>) {
        await this.repo.update(id, data);
        const retorno = await this.retornaUsuarioPorId(id);
        return retorno!;
    }

    async excluirUsuario(id: number){
        await this.repo.delete(id);
    }
}