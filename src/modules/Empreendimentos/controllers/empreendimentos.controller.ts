import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmpreendimentosServices } from '../services/empreendimentos.service';
import { Empreendimentos } from '../entities/empreedimentos.entity';

@Controller('empreendimentos')
export class EmprendimentosController {
  constructor(private readonly empreendimentosService: EmpreendimentosServices) {}

  @Post()
  criarUsuario(@Body() empreendimentos: Partial<Empreendimentos>): Empreendimentos {
    return this.empreendimentosService.create(empreendimentos);
  }

  @Get()
  retornaTodosEmpreendimentos(): Empreendimentos[] {
    return this.empreendimentosService.findAll();
  }

  @Get(':id')
  retornaEmpreendimentosPorId(@Param('id') id: string): Empreendimentos | undefined {
    return this.empreendimentosService.findById(Number(id));
  }
}
