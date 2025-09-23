import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empreendimento } from "../entities/empreendimento.entity";
import { EmpreendimentoRepositoryInterface } from "../interfaces/empreendimento.repository.interface";
import { Repository } from 'typeorm';

@Injectable()
export class EmpreendimentoRepository implements EmpreendimentoRepositoryInterface{
    constructor(
        @InjectRepository(Empreendimento)
        private readonly repo: Repository<Empreendimento>
    ){}

    async adicionarEmpreendimento(data: Partial<Empreendimento>) {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }

    async retornarTodosEmpreendimentos(): Promise<Empreendimento[]> {
        return await this.repo.find();
    }

    async retornaEmpreendimentoPorId(id: number) {
        return await this.repo.findOne({ where: {id}}) ?? null;
    }

    async editarEmpreendimento(id: number, data: Partial<Empreendimento>) {
        await this.repo.update(id, data);
        const retorno = await this.retornaEmpreendimentoPorId(id);
        return retorno!;
    }
    async excluirEmpreendimento(id: number) {
        await this.repo.delete(id);
    }
}