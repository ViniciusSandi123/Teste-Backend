import { Controller, Post, Delete, Get, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FavoritosService } from '../services/favoritos.service';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @ApiBody({ type: AdicionaFavoritoDto })
  async marcar(@Req() req, @Body() dto: AdicionaFavoritoDto) {
    return this.favoritosService.marcarFavorito(req.user.id, dto);
  }

  @Delete(':unidadeId')
  async desmarcar(@Req() req, @Param('unidadeId') unidadeId: number) {
    return this.favoritosService.desmarcarFavorito(req.user.id, unidadeId);
  }

  @Get()
  async listar(@Req() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.favoritosService.listarFavoritos(req.user.id, Number(page), Number(limit));
  }
}