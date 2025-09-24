import { AdicionaFavoritoDto } from "../dtos/adicionaFavoritoDto";

export interface FavoritoServiceInterface {
    marcarFavorito(usuarioId: number, dto: AdicionaFavoritoDto);
    desmarcarFavorito(usuarioId: number, unidadeId: number);
    listarFavoritos(usuarioId: number, page, limit);
}