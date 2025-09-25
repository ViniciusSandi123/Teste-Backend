import { Controller, Get } from '@nestjs/common';
import { RelatoriosService } from '../services/relatorios.services';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';
import { Throttle } from '@nestjs/throttler';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relService: RelatoriosService) {}

  @Throttle({ override: { limit: 5, ttl: 30 } })
  @Get('relatorioPorStatus')
  async relatorioUnidadesPorStatus(): Promise<RelatorioStatusDto> {
    return this.relService.relatorioUnidadePorStatus();
  }

  @Throttle({ override: { limit: 5, ttl: 30 } })
  @Get('relatorioPorCidade')
  async relatorioUnidadesPorCidade(): Promise<RelatorioCidadeDto[]> {
    return this.relService.relatorioUnidadePorCidade();
  }
}
