import { Empreendimento } from '../entities/empreendimento.entity';

export interface EmpreendimentoRepositoryInterface {
  adicionarEmpreendimento(data: Partial<Empreendimento>);
  retornarTodosEmpreendimentos(): Promise<Empreendimento[]>;
  retornaEmpreendimentoPorId(id: number);
  editarEmpreendimento(id: number, data: Partial<Empreendimento>);
  excluirEmpreendimento(id: number);
}
