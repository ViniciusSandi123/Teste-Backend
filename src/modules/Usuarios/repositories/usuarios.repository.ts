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
        return this.repo.save(entity);
    }

    async retornarTodosUsuarios(): Promise<Usuario[]> {
        return this.repo.find();
    }

    async retornaUsuarioPorId(id: number) {
        return this.repo.findOne({ where: {id}}) ?? null;
    }

    async retornaUsuarioPorEmail(email: string){
        return this.repo.findOne({ where: { email } }) ?? null;
    }

    async alterarUsuario(id: number, data: Partial<Usuario>) {
        await this.repo.update(id, data);
        return (await this.retornaUsuarioPorId(id))!;
    }

    async excluirUsuario(id: number){
        await this.repo.delete(id);
    }
}