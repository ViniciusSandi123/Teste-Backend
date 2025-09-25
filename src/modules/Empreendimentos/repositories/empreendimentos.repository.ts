import { Injectable, NotFoundException } from '@nestjs/common';
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
        const retorno = await this.repo.find();
        if (!retorno.length) {
            throw new NotFoundException('Nenhum empreendimento encontrado');
        }
        return retorno;
    }

    async retornaEmpreendimentoPorId(id: number) : Promise<Empreendimento> {
        const empreendimento = await this.repo.findOne({ where: {id}});
        if (!empreendimento) {
            throw new NotFoundException('Empreendimento não encontrado');
        }
        return empreendimento; 
    }

    async editarEmpreendimento(id: number, data: Partial<Empreendimento>) {
        const existente = await this.repo.findOne({ where: { id } });
        if (!existente) {
            throw new NotFoundException('Empreendimento não encontrado');
        }

        await this.repo.update(id, data);
        const retorno = await this.retornaEmpreendimentoPorId(id);
        return retorno!;
    }

    async excluirEmpreendimento(id: number) {
        const existente = await this.repo.findOne({ where: { id } });
        if (!existente) {
            throw new NotFoundException('Empreendimento não encontrado');
        }
        await this.repo.delete(id);
        return { message: `Empreendimento removido com sucesso` };
    }
}