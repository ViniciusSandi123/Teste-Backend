import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RelatoriosRepository } from '../repositories/relatorios.repository';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';
import { RelatorioServiceInterface } from '../interfaces/relatorio.service.interface';

@Injectable()
export class RelatoriosService implements RelatorioServiceInterface {
  constructor(private readonly relRepo: RelatoriosRepository) {}

  async relatorioUnidadePorStatus(): Promise<RelatorioStatusDto> {
    try {
      const resultado = await this.relRepo.queryUnidadePorStatus();
      if (resultado.length === 0) {
        throw new NotFoundException('Nenhuma unidade encontrada');
      }
      const mapStatus = { 1: 'DISPONIVEL', 2: 'RESERVADO', 3: 'VENDIDO' };
      const retorno: RelatorioStatusDto = { DISPONIVEL: 0, RESERVADO: 0, VENDIDO: 0 };
      resultado.forEach(r => {
        retorno[mapStatus[r.status]] = parseInt(r.total, 10);
      });
      return retorno;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao gerar relatório por status');
    }
  }

    async relatorioUnidadePorCidade(): Promise<RelatorioCidadeDto[]> {
    try {
      const resultado = await this.relRepo.queryUnidadePorCidade();
      if (resultado.length === 0) {
        throw new NotFoundException('Nenhuma unidade encontrada');
      }
      return resultado.map(r => ({
        cidade: r.cidade,
        total: parseInt(r.total, 10),
      }));
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Erro ao gerar relatório por cidade');
    }
  }
}
