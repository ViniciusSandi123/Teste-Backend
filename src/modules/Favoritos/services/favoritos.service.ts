import { Injectable } from '@nestjs/common';
import { FavoritoRepository } from '../repositories/favoritos.repository';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';
import { FavoritoServiceInterface } from '../interfaces/favorito.service.interface';

@Injectable()
export class FavoritosService implements FavoritoServiceInterface {
  constructor(private readonly favoritoRepository: FavoritoRepository) {}

  async marcarFavorito(usuarioId: number, dto: AdicionaFavoritoDto) {
    return await this.favoritoRepository.adicionarFavorito(usuarioId, dto.unidadeId);
  }

  async desmarcarFavorito(usuarioId: number, unidadeId: number) {
    await this.favoritoRepository.removerFavorito(usuarioId, unidadeId);
    return { message: 'Favorito removido com sucesso' };
  }

  async listarFavoritos(usuarioId: number, page = 1, limit = 10) {
    return await this.favoritoRepository.listarFavoritos(usuarioId, page, limit);
  }
}