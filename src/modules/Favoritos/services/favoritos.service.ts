import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FavoritoRepository } from '../repositories/favoritos.repository';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';
import { FavoritoServiceInterface } from '../interfaces/favorito.service.interface';

@Injectable()
export class FavoritosService implements FavoritoServiceInterface {
  private readonly logger = new Logger(FavoritosService.name);
  constructor(private readonly favoritoRepository: FavoritoRepository) {}

  async marcarFavorito(usuarioId: number, dto: AdicionaFavoritoDto) {
    this.logger.log(`marcarFavorito chamado - usuarioId: ${usuarioId}, unidadeId: ${dto.unidadeId}`);
    try {
      const retorno = await this.favoritoRepository.adicionarFavorito(usuarioId, dto.unidadeId);
      this.logger.log(`Favorito marcado com sucesso - usuarioId: ${usuarioId}, unidadeId: ${dto.unidadeId}`);
      return retorno;
    } catch (erro) {
      this.logger.error(`Erro ao marcar favorito - usuarioId: ${usuarioId}, unidadeId: ${dto.unidadeId}`, erro.stack);
      throw new BadRequestException('Erro ao marcar Favorito');
    }
  }

  async desmarcarFavorito(usuarioId: number, unidadeId: number) {
    this.logger.log(`desmarcarFavorito chamado - usuarioId: ${usuarioId}, unidadeId: ${unidadeId}`);
    try {
      await this.favoritoRepository.removerFavorito(usuarioId, unidadeId);
      this.logger.log(`Favorito removido com sucesso - usuarioId: ${usuarioId}, unidadeId: ${unidadeId}`);
      return { message: 'Favorito removido com sucesso' };
    } catch (erro) {
      this.logger.error(`Erro ao remover favorito - usuarioId: ${usuarioId}, unidadeId: ${unidadeId}`, erro.stack);
      throw new BadRequestException('Erro ao remover Favorito');
    }
  }

  async listarFavoritos(usuarioId: number, page = 1, limit = 10) {
    this.logger.log(`listarFavoritos chamado - usuarioId: ${usuarioId}, page: ${page}, limit: ${limit}`);
    try {
      const retorno = await this.favoritoRepository.listarFavoritos(usuarioId, page, limit);
      if (retorno.length === 0) {
        this.logger.warn(`Nenhum favorito encontrado - usuarioId: ${usuarioId}`);
        return { message: 'Nenhuma unidade marcada como Favorito' };
      }
      this.logger.log(`Favoritos listados com sucesso - usuarioId: ${usuarioId}, total: ${retorno.length}`);
      return retorno;
    } catch (erro) {
      this.logger.error(`Erro ao listar favoritos - usuarioId: ${usuarioId}`, erro.stack);
      throw new BadRequestException('Erro ao listar Favorito');
    }
  }
}