import { Empreendimento } from 'src/modules/Empreendimentos/entities/empreendimento.entity';
import { Unidade } from '../entities/unidade.entity';

export interface UnidadeRepositoryInterface {
  adicionarUnidade(data: Partial<Unidade>, empreendimento: Empreendimento): Promise<Unidade>;
  retornarTodasUnidades(filtros?: {
      status?: number;
      precoMin?: number;
      precoMax?: number;
      cidade?: string;
      empreendimentoId?: number;
      page?: number;
      limit?: number;
      orderByPreco?: 'ASC' | 'DESC';
    }
  ): Promise<Unidade[]>;
  retornaUnidadePorId(id: number): Promise<Unidade | null>;
  editarUnidade(id: number, data: Partial<Unidade>, empreendimento: Empreendimento): Promise<Unidade>
  excluirUnidade(id: number): Promise<void>;
}
