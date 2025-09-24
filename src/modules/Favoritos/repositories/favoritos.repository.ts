import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Favorito } from '../entities/favorito.entity';
import { FavoritoRepositoryInterface } from '../interfaces/favorito.repository.interface';
import { Usuario } from 'src/modules/Usuarios/entities/usuario.entity';
import { Unidade } from 'src/modules/Unidades/entities/unidade.entity';

@Injectable()
export class FavoritoRepository implements FavoritoRepositoryInterface {
  constructor(
    @InjectRepository(Favorito)
    private readonly repo: Repository<Favorito>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Unidade)
    private readonly unidadeRepo: Repository<Unidade>
  ) {}

  async adicionarFavorito(usuarioId: number, unidadeId: number): Promise<Favorito> {
    const usuario = await this.usuarioRepo.findOne({ where: { id: usuarioId } });
    const unidade = await this.unidadeRepo.findOne({ where: { id: unidadeId } });

    if (!usuario || !unidade){
      throw new Error('Usuário ou Unidade não encontrados');
    } 

    const favorito: DeepPartial<Favorito> = {
      usuario: { id: usuario.id },
      unidade: { id: unidade.id },
    };

    return await this.repo.save(favorito);
  }

  async removerFavorito(usuarioId: number, unidadeId: number): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .delete()
      .from(Favorito)
      .where('usuario_id = :usuarioId AND unidade_id = :unidadeId', { usuarioId, unidadeId })
      .execute();
  }

  async listarFavoritos(usuarioId: number, page = 1, limit = 10): Promise<Favorito[]> {
    const favoritos = await this.repo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['unidade', 'unidade.empreendimento'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return favoritos;
  }
}
