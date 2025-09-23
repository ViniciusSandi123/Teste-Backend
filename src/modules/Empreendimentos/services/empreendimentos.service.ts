import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.empreendimentoRepository.adicionarEmpreendimento(data);
  }

  async buscarTodosEmpreendimentos() {
    return await this.empreendimentoRepository.retornarTodosEmpreendimentos();
  }

  async buscarEmpreendimentoPorId(id: number) {
    const empreendimento = await this.empreendimentoRepository.retornaEmpreendimentoPorId(id);
    if (!empreendimento) {
      throw new NotFoundException(`Empreendimento não encontrado`);
    }
    return empreendimento;
  }

  async editarEmpreendimento(id: number, data: EditarEmpreendimentoDto) {
    const empreendimento = await this.empreendimentoRepository.editarEmpreendimento(id, data);
    if (!empreendimento) {
      throw new NotFoundException(`Empreendimento não encontrado`);
    }
    return empreendimento;
  }

  async excluirEmpreendimento(id: number) {
    const empreendimento = await this.buscarEmpreendimentoPorId(id);
    await this.empreendimentoRepository.excluirEmpreendimento(empreendimento.id);
    return { message: `Empreendimento removido com sucesso` };
  }
}
