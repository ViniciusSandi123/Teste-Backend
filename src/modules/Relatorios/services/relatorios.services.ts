import { Injectable } from '@nestjs/common';
import { RelatoriosRepository } from '../repositories/relatorios.repository';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';
import { RelatorioServiceInterface } from '../interfaces/relatorio.service.interface';

@Injectable()
export class RelatoriosService implements RelatorioServiceInterface {
  constructor(private readonly relRepo: RelatoriosRepository) {}

  async relatorioUnidadePorStatus(): Promise<RelatorioStatusDto> {
    const resultado = await this.relRepo.queryUnidadePorStatus();
    const mapStatus = { 1: 'DISPONIVEL', 2: 'RESERVADO', 3: 'VENDIDO' };
    const retorno: RelatorioStatusDto = { DISPONIVEL: 0, RESERVADO: 0, VENDIDO: 0 };

    resultado.forEach(r => {
      retorno[mapStatus[r.status]] = parseInt(r.total, 10);
    });

    return retorno;
  }

  async relatorioUnidadePorCidade(): Promise<RelatorioCidadeDto[]> {
    const resultado = await this.relRepo.queryUnidadePorCidade();
    const retorno = resultado.map(r => (
        { cidade: r.cidade, total: parseInt(r.total, 10) }));
    return retorno;
  }
}
