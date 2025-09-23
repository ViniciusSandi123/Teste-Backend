import { Favorito } from '../../Favoritos/entities/favorito.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritosServices{
    private favoritos: Favorito[] = [];

    create(favoritos: Partial<Favorito>): Favorito {
        const newFavoritos: Favorito = {
          id: this.favoritos.length + 1,
          ...favoritos,
        } as Favorito;
        this.favoritos.push(newFavoritos);
        return newFavoritos;
      }
    
      findAll(): Favorito[] {
        return this.favoritos;
      }
    
      findById(id: number): Favorito | undefined {
        return this.favoritos.find(u => u.id === id);
      }
}