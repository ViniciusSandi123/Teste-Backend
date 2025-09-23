import { Favorito } from '../../Favoritos/entities/favorito.entity';
import { FavoritosServices } from './../services/favoritos.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosServices) {}

  @Post()
  criarUsuario(@Body() favoritos: Partial<Favorito>): Favorito {
    return this.favoritosService.create(favoritos);
  }

  @Get()
  retornaTodosEmpreendimentos(): Favorito[] {
    return this.favoritosService.findAll();
  }

  @Get(':id')
  retornaEmpreendimentosPorId(@Param('id') id: string): Favorito | undefined {
    return this.favoritosService.findById(Number(id));
  }
}
