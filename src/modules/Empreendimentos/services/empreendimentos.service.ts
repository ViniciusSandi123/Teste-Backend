import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EmpreendimentoRepository } from '../repositories/empreendimentos.repository';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';
import { EmpreendimentoServiceInterface } from '../interfaces/empreendimento.service.interface';

@Injectable()
export class EmpreendimentosService implements EmpreendimentoServiceInterface{
  constructor(
    private readonly empreendimentoRepository: EmpreendimentoRepository,
  ) {}

  async criarEmpreendimento(data: CriarEmpreendimentoDto) {
    try {
      const retorno = await this.empreendimentoRepository.adicionarEmpreendimento(data);
      return retorno;
    } catch (Error) {
      throw new BadRequestException('Erro ao criar Empreendimento');
    }
  }

  async buscarTodosEmpreendimentos() {
    try {
      const retorno = await this.empreendimentoRepository.retornarTodosEmpreendimentos();
      return retorno;
    } catch (Erro) {
      throw new BadRequestException('Erro ao buscar todos Empreendimentos');
    }
  }

  async buscarEmpreendimentoPorId(id: number) {
    try {
      const retorno = await this.empreendimentoRepository.retornaEmpreendimentoPorId(id);
      return retorno;
    } catch (Erro) {
      throw new BadRequestException('Erro ao buscar Empreendimento');
    }
  }

  async editarEmpreendimento(id: number, data: EditarEmpreendimentoDto) {
    try {
      const retorno = await this.empreendimentoRepository.editarEmpreendimento(id, data);
      return retorno;
    } catch (Erro) {
      throw new BadRequestException('Erro ao editar Empreendimento');
    }
  }

  async excluirEmpreendimento(id: number) {
    try {
      const empreendimento = await this.buscarEmpreendimentoPorId(id);
      await this.empreendimentoRepository.excluirEmpreendimento(empreendimento.id);
    } catch (Erro) {
      throw new BadRequestException('Erro ao excluir Empreendimento');
    }
  }
}
