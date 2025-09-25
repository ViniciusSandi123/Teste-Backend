import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EmpreendimentoRepository } from '../repositories/empreendimentos.repository';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';
import { EmpreendimentoServiceInterface } from '../interfaces/empreendimento.service.interface';

@Injectable()
export class EmpreendimentosService implements EmpreendimentoServiceInterface {
  private readonly logger = new Logger(EmpreendimentosService.name);
  constructor(private readonly empreendimentoRepository: EmpreendimentoRepository) {}

  async criarEmpreendimento(data: CriarEmpreendimentoDto) {
    this.logger.log(`criarEmpreendimento chamado - data: ${JSON.stringify(data)}`);
    try {
      const retorno = await this.empreendimentoRepository.adicionarEmpreendimento(data);
      this.logger.log(`Empreendimento criado com sucesso - id: ${retorno.id}`);
      return retorno;
    } catch (error) {
      this.logger.error('Erro ao criar Empreendimento', error.stack);
      throw new BadRequestException('Erro ao criar Empreendimento');
    }
  }

  async buscarTodosEmpreendimentos() {
    this.logger.log('buscarTodosEmpreendimentos chamado');
    try {
      const retorno = await this.empreendimentoRepository.retornarTodosEmpreendimentos();
      this.logger.log(`Total de empreendimentos retornados: ${retorno.length}`);
      return retorno;
    } catch (error) {
      this.logger.error('Erro ao buscar todos Empreendimentos', error.stack);
      throw new BadRequestException('Erro ao buscar todos Empreendimentos');
    }
  }

  async buscarEmpreendimentoPorId(id: number) {
    this.logger.log(`buscarEmpreendimentoPorId chamado - id: ${id}`);
    try {
      const retorno = await this.empreendimentoRepository.retornaEmpreendimentoPorId(id);
      if (!retorno) {
        this.logger.warn(`Empreendimento não encontrado - id: ${id}`);
        throw new NotFoundException('Empreendimento não encontrado');
      }
      this.logger.log(`Empreendimento encontrado - id: ${id}`);
      return retorno;
    } catch (error) {
      this.logger.error(`Erro ao buscar Empreendimento - id: ${id}`, error.stack);
      throw new BadRequestException('Erro ao buscar Empreendimento');
    }
  }

  async editarEmpreendimento(id: number, data: EditarEmpreendimentoDto) {
    this.logger.log(`editarEmpreendimento chamado - id: ${id}, data: ${JSON.stringify(data)}`);
    try {
      const retorno = await this.empreendimentoRepository.editarEmpreendimento(id, data);
      this.logger.log(`Empreendimento editado com sucesso - id: ${id}`);
      return retorno;
    } catch (error) {
      this.logger.error(`Erro ao editar Empreendimento - id: ${id}`, error.stack);
      throw new BadRequestException('Erro ao editar Empreendimento');
    }
  }

  async excluirEmpreendimento(id: number) {
    this.logger.log(`excluirEmpreendimento chamado - id: ${id}`);
    try {
      const empreendimento = await this.buscarEmpreendimentoPorId(id);
      await this.empreendimentoRepository.excluirEmpreendimento(empreendimento.id);
      this.logger.log(`Empreendimento excluído com sucesso - id: ${id}`);
    } catch (error) {
      this.logger.error(`Erro ao excluir Empreendimento - id: ${id}`, error.stack);
      throw new BadRequestException('Erro ao excluir Empreendimento');
    }
  }
}