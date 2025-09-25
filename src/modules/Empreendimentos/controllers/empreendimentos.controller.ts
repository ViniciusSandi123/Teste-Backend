import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EmpreendimentosService } from '../services/empreendimentos.service';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';
import { ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('empreendimentos')
export class EmpreendimentosController {
  constructor(private readonly empreendimentosService: EmpreendimentosService) {}

  @Post()
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiBody({ type: CriarEmpreendimentoDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async criar(@Body() dto: CriarEmpreendimentoDto) {
    return this.empreendimentosService.criarEmpreendimento(dto);
  }

  @Get()
  @Throttle({ override: { limit: 5, ttl: 30 } })
  async listarTodos() {
    return this.empreendimentosService.buscarTodosEmpreendimentos();
  }

  @Get(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empreendimentosService.buscarEmpreendimentoPorId(id);
  }

  @Put(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  @ApiBody({ type: EditarEmpreendimentoDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async editar(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarEmpreendimentoDto) {
    return this.empreendimentosService.editarEmpreendimento(id, dto);
  }

  @Delete(':id')
  @Throttle({ override: { limit: 5, ttl: 30 } })
  async excluir(@Param('id', ParseIntPipe) id: number) {
    return this.empreendimentosService.excluirEmpreendimento(id);
  }
}
