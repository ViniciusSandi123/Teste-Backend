import { EmpreendimentoRepository } from './../../Empreendimentos/repositories/empreendimentos.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UnidadeRepository } from '../repositories/unidades.repository';
import { UnidadeServiceInterface } from '../interfaces/unidade.service.interface';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';

@Injectable()
export class UnidadesService implements UnidadeServiceInterface {
  constructor(
    private readonly unidadeRepository: UnidadeRepository,
    private readonly empreendimentoRepositoy: EmpreendimentoRepository
  ) {}

  async criarUnidade(dto: CriarUnidadeDto) {
    const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id);
    return await this.unidadeRepository.adicionarUnidade(dto, empreendimento);
  }

  async buscarTodasUnidades(filtros?: {
    status?: number;
    precoMin?: number;
    precoMax?: number;
    cidade?: string;
    empreendimentoId?: number;
    page?: number;
    limit?: number;
    orderByPreco?: 'ASC' | 'DESC';
  }) {
    return await this.unidadeRepository.retornarTodasUnidades(filtros);
  }

  async buscarUnidadePorId(id: number) {
    const unidade = await this.unidadeRepository.retornaUnidadePorId(id);
    if (!unidade) throw new NotFoundException('Unidade não encontrada');
    return unidade;
  }

  async editarUnidade(id: number, dto: EditarUnidadeDto) {
    const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id!);
    const unidade = await this.unidadeRepository.editarUnidade(id, dto, empreendimento);
    return unidade;
  }

  async excluirUnidade(id: number) {
    const unidade = await this.buscarUnidadePorId(id);
    await this.unidadeRepository.excluirUnidade(unidade.id);
    return { message: 'Unidade removida com sucesso' };
  }
}
