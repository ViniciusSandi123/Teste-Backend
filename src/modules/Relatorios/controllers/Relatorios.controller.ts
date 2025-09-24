import { Controller, Get } from '@nestjs/common';
import { RelatoriosService } from '../services/relatorios.services';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Relatórios')
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relService: RelatoriosService) {}

  @Get('relatorioPorStatus')
  async relatorioUnidadesPorStatus(): Promise<RelatorioStatusDto> {
    return this.relService.relatorioUnidadePorStatus();
  }

  @Get('relatorioPorCidade')
  async relatorioUnidadesPorCidade(): Promise<RelatorioCidadeDto[]> {
    return this.relService.relatorioUnidadePorCidade();
  }
}
