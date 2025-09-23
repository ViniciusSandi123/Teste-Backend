import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EmpreendimentosService } from '../services/empreendimentos.service';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('empreendimentos')
export class EmprendimentosController {
  constructor(private readonly empreendimentosService: EmpreendimentosService) {}

  @Post()
  @ApiBody({ type: CriarEmpreendimentoDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async criar(@Body() dto: CriarEmpreendimentoDto) {
    return this.empreendimentosService.criarEmpreendimento(dto);
  }

  @Get()
  async listarTodos() {
    return this.empreendimentosService.buscarTodosEmpreendimentos();
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empreendimentosService.buscarEmpreendimentoPorId(id);
  }

  @Put(':id')
  @ApiBody({ type: EditarEmpreendimentoDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async editar(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarEmpreendimentoDto) {
    return this.empreendimentosService.editarEmpreendimento(id, dto);
  }

  @Delete(':id')
  async excluir(@Param('id', ParseIntPipe) id: number) {
    return this.empreendimentosService.excluirEmpreendimento(id);
  }
}
