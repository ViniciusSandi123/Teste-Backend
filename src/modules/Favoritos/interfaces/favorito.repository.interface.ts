import { Favorito } from "../entities/favorito.entity";

export interface FavoritoRepositoryInterface {
  adicionarFavorito(usuarioId: number, unidadeId: number): Promise<Favorito>;
  removerFavorito(usuarioId: number, unidadeId: number): Promise<void>;
  listarFavoritos(usuarioId: number, page: number, limit: number): Promise<Favorito[]>;
}
