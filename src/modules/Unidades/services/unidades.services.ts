import { EmpreendimentoRepository } from './../../Empreendimentos/repositories/empreendimentos.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id);
      const retorno = await this.unidadeRepository.adicionarUnidade(dto, empreendimento);
      return retorno;
    } catch (error) {
      throw new BadRequestException('Erro ao criar Unidade');
    }
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
    try {
      const retorno = await this.unidadeRepository.retornarTodasUnidades(filtros);
      return retorno;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar Unidades');
    }
  }

  async buscarUnidadePorId(id: number) {
    try {
      const retorno = await this.unidadeRepository.retornaUnidadePorId(id);
      return retorno;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar Unidade');
    }
  }

  async editarUnidade(id: number, dto: EditarUnidadeDto) {
    try {
      const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id!);
      const retorno = await this.unidadeRepository.editarUnidade(id, dto, empreendimento);
      return retorno;
    } catch (error) {
      throw new BadRequestException('Erro ao editar Unidade');
    }
  }

  async excluirUnidade(id: number) {
    try {
      const unidade = await this.buscarUnidadePorId(id);
      await this.unidadeRepository.excluirUnidade(unidade.id);
      return { message: 'Unidade removida com sucesso' };
    } catch (error) {
      throw new BadRequestException('Erro ao excluir unidade');
    }
  }
}
