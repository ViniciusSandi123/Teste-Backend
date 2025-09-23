import { CriarEmpreendimentoDto } from './../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';

export interface EmpreendimentoServiceInterface {
  criarEmpreendimento(dto: CriarEmpreendimentoDto);
  buscarTodosEmpreendimentos();
  buscarEmpreendimentoPorId(id: number);
  editarEmpreendimento(id: number, data: EditarEmpreendimentoDto);
  excluirEmpreendimento(id: number);
}
