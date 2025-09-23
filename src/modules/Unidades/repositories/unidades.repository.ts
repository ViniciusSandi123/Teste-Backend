import { Empreendimento } from './../../Empreendimentos/entities/empreendimento.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from '../entities/unidade.entity';
import { UnidadeRepositoryInterface } from '../interfaces/unidade.repository.interface';

@Injectable()
export class UnidadeRepository implements UnidadeRepositoryInterface {
  constructor(
    @InjectRepository(Unidade)
    private readonly repo: Repository<Unidade>) {}

  async adicionarUnidade(data: Partial<Unidade>, empreendimento: Empreendimento): Promise<Unidade> {
    const unidade: Partial<Unidade> = {
    torre: data.torre,
    numero: data.numero,
    metro_quadrado: data.metro_quadrado,
    preco: data.preco,
    status: data.status,
    empreendimento,
  }; 
    const entity = this.repo.create(unidade);
    return await this.repo.save(entity);
  }

  async retornarTodasUnidades(filtros?: {
    status?: number;
    precoMin?: number;
    precoMax?: number;
    cidade?: string;
    empreendimentoId?: number;
    page?: number;
    limit?: number;
    orderByPreco?: 'ASC' | 'DESC';
  }): Promise<Unidade[]> {
    const query = this.repo.createQueryBuilder('unidade')
      .leftJoinAndSelect('unidade.empreendimento', 'empreendimento');

    if (filtros?.status !== undefined) query.andWhere('unidade.status = :status', { status: filtros.status });
    if (filtros?.precoMin !== undefined) query.andWhere('unidade.preco >= :precoMin', { precoMin: filtros.precoMin });
    if (filtros?.precoMax !== undefined) query.andWhere('unidade.preco <= :precoMax', { precoMax: filtros.precoMax });
    if (filtros?.cidade) query.andWhere('empreendimento.cidade = :cidade', { cidade: filtros.cidade });
    if (filtros?.empreendimentoId) query.andWhere('unidade.empreendimento_id = :empreendimentoId', { empreendimentoId: filtros.empreendimentoId });

    if (filtros?.orderByPreco) query.orderBy('unidade.preco', filtros.orderByPreco);

    if (filtros?.page !== undefined && filtros?.limit !== undefined) {
      query.skip((filtros.page - 1) * filtros.limit).take(filtros.limit);
    }

    const queryUnidades = query.getMany();
    return queryUnidades;
  }

  async retornaUnidadePorId(id: number): Promise<Unidade> {
    const retorno = await this.repo.findOne({ where: { id }, relations: ['empreendimento', 'favoritos'] });
    if (!retorno){
      throw new NotFoundException('Unidade não encontrado');
    }
    return retorno;
  }

  async editarUnidade(id: number, data: Partial<Unidade>, empreendimento: Empreendimento): Promise<Unidade> {
    const unidadeAtualizada: Partial<Unidade> = {
    torre: data.torre,
    numero: data.numero,
    metro_quadrado: data.metro_quadrado,
    preco: data.preco,
    status: data.status,
    empreendimento,
    };  
    await this.repo.update(id, unidadeAtualizada);
    const retorno = await this.retornaUnidadePorId(id);
    return retorno;
  }

  async excluirUnidade(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
