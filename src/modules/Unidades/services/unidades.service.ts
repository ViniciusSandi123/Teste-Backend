import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UnidadeRepository } from '../repositories/unidades.repository';
import { EmpreendimentoRepository } from '../../Empreendimentos/repositories/empreendimentos.repository';
import { UnidadeServiceInterface } from '../interfaces/unidade.service.interface';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';

@Injectable()
export class UnidadesService implements UnidadeServiceInterface {
  private readonly logger = new Logger(UnidadesService.name);
  constructor(
    private readonly unidadeRepository: UnidadeRepository,
    private readonly empreendimentoRepositoy: EmpreendimentoRepository
  ) {}

  async criarUnidade(dto: CriarUnidadeDto) {
    this.logger.log('criarUnidade chamado');
    try {
      const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id);
      const retorno = await this.unidadeRepository.adicionarUnidade(dto, empreendimento);
      this.logger.log(`Unidade criada com sucesso: ${retorno.id}`);
      return retorno;
    } catch (error) {
      this.logger.error('Erro ao criar Unidade', error.stack);
      throw new BadRequestException('Erro ao criar Unidade');
    }
  }

  async buscarTodasUnidades(filtros?: { status?: number; precoMin?: number; precoMax?: number; cidade?: string; empreendimentoId?: number; page?: number; limit?: number; orderByPreco?: 'ASC' | 'DESC'; }) {
    this.logger.log('buscarTodasUnidades chamado');
    try {
      const retorno = await this.unidadeRepository.retornarTodasUnidades(filtros);
      this.logger.log(`Total de unidades retornadas: ${retorno.length}`);
      return retorno;
    } catch (error) {
      this.logger.error('Erro ao buscar Unidades', error.stack);
      throw new BadRequestException('Erro ao buscar Unidades');
    }
  }

  async buscarUnidadePorId(id: number) {
    this.logger.log(`buscarUnidadePorId chamado: ${id}`);
    try {
      const retorno = await this.unidadeRepository.retornaUnidadePorId(id);
      if (!retorno) {
        this.logger.warn(`Unidade não encontrada: ${id}`);
        throw new NotFoundException('Unidade não encontrada');
      }
      this.logger.log(`Unidade encontrada: ${id}`);
      return retorno;
    } catch (error) {
      this.logger.error(`Erro ao buscar Unidade: ${id}`, error.stack);
      throw new BadRequestException('Erro ao buscar Unidade');
    }
  }

  async editarUnidade(id: number, dto: EditarUnidadeDto) {
    this.logger.log(`editarUnidade chamado: ${id}`);
    try {
      const empreendimento = await this.empreendimentoRepositoy.retornaEmpreendimentoPorId(dto.empreendimento_id!);
      const retorno = await this.unidadeRepository.editarUnidade(id, dto, empreendimento);
      this.logger.log(`Unidade editada com sucesso: ${id}`);
      return retorno;
    } catch (error) {
      this.logger.error(`Erro ao editar Unidade: ${id}`, error.stack);
      throw new BadRequestException('Erro ao editar Unidade');
    }
  }

  async excluirUnidade(id: number) {
    this.logger.log(`excluirUnidade chamado: ${id}`);
    try {
      const unidade = await this.buscarUnidadePorId(id);
      await this.unidadeRepository.excluirUnidade(unidade.id);
      this.logger.log(`Unidade removida com sucesso: ${id}`);
      return { message: 'Unidade removida com sucesso' };
    } catch (error) {
      this.logger.error(`Erro ao excluir Unidade: ${id}`, error.stack);
      throw new BadRequestException('Erro ao excluir unidade');
    }
  }
}