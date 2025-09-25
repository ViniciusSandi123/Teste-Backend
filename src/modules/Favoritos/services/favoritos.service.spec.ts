import { Test, TestingModule } from '@nestjs/testing';
import { FavoritosService } from './favoritos.service';
import { FavoritoRepository } from '../repositories/favoritos.repository';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';
import { BadRequestException } from '@nestjs/common';

describe('FavoritosService', () => {
  let service: FavoritosService;
  let repository: FavoritoRepository;

  const mockRepository = {
    adicionarFavorito: jest.fn(),
    removerFavorito: jest.fn(),
    listarFavoritos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritosService,
        {
          provide: FavoritoRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritosService>(FavoritosService);
    repository = module.get<FavoritoRepository>(FavoritoRepository);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('marcarFavorito', () => {
    it('deve marcar favorito com sucesso', async () => {
      const dto: AdicionaFavoritoDto = { unidadeId: 10 };
      const retorno = { id: 1, unidade: { id: 10 } };
      mockRepository.adicionarFavorito.mockResolvedValue(retorno);

      const result = await service.marcarFavorito(42, dto);
      expect(result).toEqual(retorno);
      expect(repository.adicionarFavorito).toHaveBeenCalledWith(42, 10);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.adicionarFavorito.mockRejectedValue(new Error());
      await expect(service.marcarFavorito(42, { unidadeId: 10 })).rejects.toThrow(
        new BadRequestException('Erro ao marcar Favorito'),
      );
    });
  });

  describe('desmarcarFavorito', () => {
    it('deve desmarcar favorito com sucesso', async () => {
      mockRepository.removerFavorito.mockResolvedValue(undefined);

      const result = await service.desmarcarFavorito(42, 10);
      expect(result).toEqual({ message: 'Favorito removido com sucesso' });
      expect(repository.removerFavorito).toHaveBeenCalledWith(42, 10);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.removerFavorito.mockRejectedValue(new Error());
      await expect(service.desmarcarFavorito(42, 10)).rejects.toThrow(
        new BadRequestException('Erro ao remover Favorito'),
      );
    });
  });

  describe('listarFavoritos', () => {
    it('deve retornar favoritos com sucesso', async () => {
      const retorno = [{ id: 1 }, { id: 2 }];
      mockRepository.listarFavoritos.mockResolvedValue(retorno);

      const result = await service.listarFavoritos(42, 1, 10);
      expect(result).toEqual(retorno);
      expect(repository.listarFavoritos).toHaveBeenCalledWith(42, 1, 10);
    });

    it('deve retornar mensagem se lista estiver vazia', async () => {
      mockRepository.listarFavoritos.mockResolvedValue([]);

      const result = await service.listarFavoritos(42, 1, 10);
      expect(result).toEqual({ message: 'Nenhuma unidade marcada como Favorito' });
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.listarFavoritos.mockRejectedValue(new Error());
      await expect(service.listarFavoritos(42)).rejects.toThrow(
        new BadRequestException('Erro ao listar Favorito'),
      );
    });
  });
});