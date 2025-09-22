import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmpreendimentosServices } from '../services/empreendimentos.service';
import { Empreendimento } from '../entities/empreedimento.entity';

@Controller('empreendimentos')
export class EmprendimentosController {
  constructor(private readonly empreendimentosService: EmpreendimentosServices) {}

  @Post()
  criarUsuario(@Body() empreendimentos: Partial<Empreendimento>): Empreendimento {
    return this.empreendimentosService.create(empreendimentos);
  }

  @Get()
  retornaTodosEmpreendimentos(): Empreendimento[] {
    return this.empreendimentosService.findAll();
  }

  @Get(':id')
  retornaEmpreendimentosPorId(@Param('id') id: string): Empreendimento | undefined {
    return this.empreendimentosService.findById(Number(id));
  }
}
