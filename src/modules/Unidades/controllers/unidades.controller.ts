import { Controller,Get,Post,Put,Delete,Body,Param,Query,ParseIntPipe,UsePipes,ValidationPipe } from '@nestjs/common';
import { UnidadesService } from '../services/unidades.services';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';
import { ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Unidades')
@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiBody({ type: CriarUnidadeDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async adicionarUnidade(@Body() dto: CriarUnidadeDto) {
    return this.unidadesService.criarUnidade(dto);
  }

  @Get()
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'precoMin', required: false })
  @ApiQuery({ name: 'precoMax', required: false })
  @ApiQuery({ name: 'cidade', required: false })
  @ApiQuery({ name: 'empreendimentoId', required: false })
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @ApiQuery({ name: 'orderByPreco', required: false, enum: ['ASC', 'DESC'] })
  async listarUnidadesFiltros(
    @Query('status') status?: number,
    @Query('precoMin') precoMin?: number,
    @Query('precoMax') precoMax?: number,
    @Query('cidade') cidade?: string,
    @Query('empreendimentoId') empreendimentoId?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('orderByPreco') orderByPreco?: 'ASC' | 'DESC',
  ) {
    return this.unidadesService.buscarTodasUnidades({
      status,
      precoMin,
      precoMax,
      cidade,
      empreendimentoId,
      page,
      limit,
      orderByPreco,
    });
  }

  @Get(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiParam({ name: 'id', type: Number })
  async listarUnidadePorId(@Param('id', ParseIntPipe) id: number) {
    return this.unidadesService.buscarUnidadePorId(id);
  }

  @Put(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: EditarUnidadeDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async editarUnidade(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarUnidadeDto,
  ) {
    return this.unidadesService.editarUnidade(id, dto);
  }

  @Delete(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiParam({ name: 'id', type: Number })
  async RemoverUnidade(@Param('id', ParseIntPipe) id: number) {
    return this.unidadesService.excluirUnidade(id);
  }
}
