import { Test, TestingModule } from '@nestjs/testing';
import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from '../services/favoritos.service';
import { AdicionaFavoritoDto } from '../dtos/adicionaFavoritoDto';

describe('FavoritosController', () => {
  let controller: FavoritosController;
  let service: FavoritosService;

  const mockService = {
    marcarFavorito: jest.fn(),
    desmarcarFavorito: jest.fn(),
    listarFavoritos: jest.fn(),
  };

  const mockReq = { user: { id: 42 } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritosController],
      providers: [
        {
          provide: FavoritosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FavoritosController>(FavoritosController);
    service = module.get<FavoritosService>(FavoritosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve marcar um favorito', async () => {
    const dto: AdicionaFavoritoDto = { unidadeId: 10 };
    const retorno = { message: 'Favorito marcado' };
    mockService.marcarFavorito.mockResolvedValue(retorno);

    const result = await controller.marcar(mockReq, dto);
    expect(result).toEqual(retorno);
    expect(service.marcarFavorito).toHaveBeenCalledWith(42, dto);
  });

  it('deve desmarcar um favorito', async () => {
    const retorno = { message: 'Favorito removido' };
    mockService.desmarcarFavorito.mockResolvedValue(retorno);

    const result = await controller.desmarcar(mockReq, 10);
    expect(result).toEqual(retorno);
    expect(service.desmarcarFavorito).toHaveBeenCalledWith(42, 10);
  });

  it('deve listar favoritos com paginação', async () => {
    const retorno = [{ id: 1, unidadeId: 10 }];
    mockService.listarFavoritos.mockResolvedValue(retorno);

    const result = await controller.listar(mockReq, 2, 5);
    expect(result).toEqual(retorno);
    expect(service.listarFavoritos).toHaveBeenCalledWith(42, 2, 5);
  });
});