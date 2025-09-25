import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RelatoriosRepository } from '../repositories/relatorios.repository';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';
import { RelatorioServiceInterface } from '../interfaces/relatorio.service.interface';

@Injectable()
export class RelatoriosService implements RelatorioServiceInterface {
  private readonly logger = new Logger(RelatoriosService.name);
  constructor(private readonly relRepo: RelatoriosRepository) {}

  async relatorioUnidadePorStatus(): Promise<RelatorioStatusDto> {
    this.logger.log('relatorioUnidadePorStatus chamado');
    try {
      const resultado = await this.relRepo.queryUnidadePorStatus();
      this.logger.log(`Total de registros retornados: ${resultado.length}`);

      if (resultado.length === 0) {
        this.logger.warn('Nenhuma unidade encontrada para relatório por status');
        throw new NotFoundException('Nenhuma unidade encontrada');
      }

      const mapStatus = { 1: 'DISPONIVEL', 2: 'RESERVADO', 3: 'VENDIDO' };
      const retorno: RelatorioStatusDto = { DISPONIVEL: 0, RESERVADO: 0, VENDIDO: 0 };

      resultado.forEach(r => {
        retorno[mapStatus[r.status]] = parseInt(r.total, 10);
      });

      this.logger.log('Relatório por status gerado com sucesso');
      return retorno;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Erro ao gerar relatório por status', error.stack);
      throw new BadRequestException('Erro ao gerar relatório por status');
    }
  }

  async relatorioUnidadePorCidade(): Promise<RelatorioCidadeDto[]> {
    this.logger.log('relatorioUnidadePorCidade chamado');
    try {
      const resultado = await this.relRepo.queryUnidadePorCidade();
      this.logger.log(`Total de registros retornados: ${resultado.length}`);

      if (resultado.length === 0) {
        this.logger.warn('Nenhuma unidade encontrada para relatório por cidade');
        throw new NotFoundException('Nenhuma unidade encontrada');
      }

      const retorno = resultado.map(r => ({
        cidade: r.cidade,
        total: parseInt(r.total, 10),
      }));

      this.logger.log('Relatório por cidade gerado com sucesso');
      return retorno;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error('Erro ao gerar relatório por cidade', error.stack);
      throw new BadRequestException('Erro ao gerar relatório por cidade');
    }
  }
}