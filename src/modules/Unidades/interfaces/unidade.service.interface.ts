import { Unidade } from '../entities/unidade.entity';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';

export interface UnidadeServiceInterface {
  criarUnidade(dto: CriarUnidadeDto): Promise<Unidade>;
  buscarTodasUnidades(filtros?: {
    status?: number;
    precoMin?: number;
    precoMax?: number;
    cidade?: string;
    empreendimentoId?: number;
    page?: number;
    limit?: number;
    orderByPreco?: 'ASC' | 'DESC';
  }): Promise<Unidade[]>;
  buscarUnidadePorId(id: number): Promise<Unidade>;
  editarUnidade(id: number, dto: EditarUnidadeDto): Promise<Unidade>;
  excluirUnidade(id: number): Promise<{ message: string }>;
}
