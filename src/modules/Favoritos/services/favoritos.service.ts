import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoritoRepository } from '../repositories/favoritos.repository';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';
import { FavoritoServiceInterface } from '../interfaces/favorito.service.interface';

@Injectable()
export class FavoritosService implements FavoritoServiceInterface {
  constructor(private readonly favoritoRepository: FavoritoRepository) {}

  async marcarFavorito(usuarioId: number, dto: AdicionaFavoritoDto) {
    try {
      const retorno = await this.favoritoRepository.adicionarFavorito(usuarioId, dto.unidadeId);
      return retorno;
    } catch (Erro) {
      throw new BadRequestException('Erro ao gerar relatório por cidade');
    }
  }

  async desmarcarFavorito(usuarioId: number, unidadeId: number) {
    try {
      await this.favoritoRepository.removerFavorito(usuarioId, unidadeId);
      return { message: 'Favorito removido com sucesso' };
    } catch (Erro) {
      throw new BadRequestException('Erro ao remover Favorito');
    }
  }

  async listarFavoritos(usuarioId: number, page = 1, limit = 10) {
    try {
      const retorno = await this.favoritoRepository.listarFavoritos(usuarioId, page, limit);
      if(retorno.length === 0){
        return { message: "Nenhuma unidade marcada como Favorito" };
      }
      return retorno;

    } catch (Erro) {
      throw new BadRequestException('Erro ao listar Favorito');
    }
  }
}