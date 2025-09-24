import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from '../entities/favorito.entity';
import { FavoritoRepositoryInterface } from '../interfaces/favorito.repository.interface';
import { Unidade } from '../../Unidades/entities/unidade.entity';
import { Usuario } from '../../Usuarios/entities/usuario.entity';

@Injectable()
export class FavoritoRepository implements FavoritoRepositoryInterface {
  constructor(
    @InjectRepository(Favorito)
    private readonly repo: Repository<Favorito>,
  ) {}

  async adicionarFavorito(usuarioId: number, unidadeId: number): Promise<Favorito> {
    const favorito = this.repo.create({
      usuario: { id: usuarioId } as Usuario,
      unidade: { id: unidadeId } as Unidade,
    });
    return await this.repo.save(favorito);
  }

  async removerFavorito(usuarioId: number, unidadeId: number): Promise<void> {
    await this.repo.delete({ usuario: { id: usuarioId }, unidade: { id: unidadeId } });
  }

  async listarFavoritos(usuarioId: number, page = 1, limit = 10): Promise<Favorito[]> {
    return await this.repo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['unidade', 'unidade.empreendimento'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
