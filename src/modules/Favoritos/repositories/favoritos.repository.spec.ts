import { Test, TestingModule } from '@nestjs/testing';
import { FavoritoRepository } from './favoritos.repository';
import { Favorito } from '../entities/favorito.entity';
import { Usuario } from '../../Usuarios/entities/usuario.entity';
import { Unidade } from '../../Unidades/entities/unidade.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FavoritoRepository', () => {
  let repository: FavoritoRepository;
  let favoritoRepo: any;
  let usuarioRepo: any;
  let unidadeRepo: any;

  beforeEach(async () => {
    favoritoRepo = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(undefined),
      }),
    };

    usuarioRepo = {
      findOne: jest.fn(),
    };

    unidadeRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritoRepository,
        { provide: getRepositoryToken(Favorito), useValue: favoritoRepo },
        { provide: getRepositoryToken(Usuario), useValue: usuarioRepo },
        { provide: getRepositoryToken(Unidade), useValue: unidadeRepo },
      ],
    }).compile();

    repository = module.get<FavoritoRepository>(FavoritoRepository);
  });

  it('deve adicionar favorito com sucesso', async () => {
    usuarioRepo.findOne.mockResolvedValue({ id: 1 });
    unidadeRepo.findOne.mockResolvedValue({ id: 10 });
    favoritoRepo.save.mockResolvedValue({ id: 100, usuario: { id: 1 }, unidade: { id: 10 } });

    const result = await repository.adicionarFavorito(1, 10);
    expect(result).toEqual({ id: 100, usuario: { id: 1 }, unidade: { id: 10 } });
  });

  it('deve lançar erro se usuário ou unidade não forem encontrados', async () => {
    usuarioRepo.findOne.mockResolvedValue(null);
    unidadeRepo.findOne.mockResolvedValue(null);

    await expect(repository.adicionarFavorito(1, 10)).rejects.toThrow('Usuário ou Unidade não encontrados');
  });

  it('deve remover favorito existente', async () => {
    favoritoRepo.findOne.mockResolvedValue({ id: 100 });

    await expect(repository.removerFavorito(1, 10)).resolves.toBeUndefined();
    expect(favoritoRepo.createQueryBuilder().execute).toHaveBeenCalled();
  });

  it('deve lançar exceção ao remover favorito inexistente', async () => {
    favoritoRepo.findOne.mockResolvedValue(null);

    await expect(repository.removerFavorito(1, 10)).rejects.toThrow(
      new NotFoundException('Favorito não encontrado'),
    );
  });

  it('deve listar favoritos com paginação', async () => {
    const favoritos = [{ id: 1 }, { id: 2 }];
    favoritoRepo.find.mockResolvedValue(favoritos);

    const result = await repository.listarFavoritos(1, 2, 5);
    expect(result).toEqual(favoritos);
    expect(favoritoRepo.find).toHaveBeenCalledWith({
      where: { usuario: { id: 1 } },
      relations: ['unidade', 'unidade.empreendimento'],
      skip: 5,
      take: 5,
    });
  });
});