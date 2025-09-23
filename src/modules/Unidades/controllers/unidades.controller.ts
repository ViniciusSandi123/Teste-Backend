import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UnidadesServices } from '../services/unidades.services';
import { Unidade } from '../entities/unidade.entity';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesServices: UnidadesServices) {}

  @Post()
  criarUnidades(@Body() unidades: Partial<Unidade>): Unidade {
    return this.unidadesServices.create(unidades);
  }

  @Get()
  retornaTodasUnidades(): Unidade[] {
    return this.unidadesServices.findAll();
  }

  @Get(':id')
  retornaUnidadesPorId(@Param('id') id: string): Unidade | undefined {
    return this.unidadesServices.findById(Number(id));
  }
}
