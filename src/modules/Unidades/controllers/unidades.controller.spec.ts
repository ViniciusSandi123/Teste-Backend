import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesController } from './unidades.controller';
import { UnidadesService } from '../services/unidades.service';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';

describe('UnidadesController', () => {
  let controller: UnidadesController;
  let service: UnidadesService;

  const mockService = {
    criarUnidade: jest.fn(),
    buscarTodasUnidades: jest.fn(),
    buscarUnidadePorId: jest.fn(),
    editarUnidade: jest.fn(),
    excluirUnidade: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadesController],
      providers: [
        {
          provide: UnidadesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UnidadesController>(UnidadesController);
    service = module.get<UnidadesService>(UnidadesService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve adicionar uma unidade', async () => {
    const dto: CriarUnidadeDto = {
        preco: 100000,
        status: 1,
        empreendimento_id: 1,
        torre: 'Torre A',
        numero: '101',
        metro_quadrado: 75,
    };

    const retorno = {
        id: 1,
        preco: 100000,
        status: 1,
        empreendimento_id: 1,
        torre: 'Torre A',
        numero: '101',
        metro_quadrado: 75,
    };

    mockService.criarUnidade.mockResolvedValue(retorno);

    const result = await controller.adicionarUnidade(dto);
    expect(result).toEqual(retorno);
    expect(service.criarUnidade).toHaveBeenCalledWith(dto);
  });

  it('deve listar unidades com filtros', async () => {
    const filtros = {
      status: 1,
      precoMin: 50000,
      precoMax: 200000,
      cidade: 'Caxias',
      empreendimentoId: 2,
      page: 1,
      limit: 10,
      orderByPreco: 'ASC' as const,
    };
    const retorno = [{ id: 1, preco: 100000 }];
    mockService.buscarTodasUnidades.mockResolvedValue(retorno);

    const result = await controller.listarUnidadesFiltros(
      filtros.status,
      filtros.precoMin,
      filtros.precoMax,
      filtros.cidade,
      filtros.empreendimentoId,
      filtros.page,
      filtros.limit,
      filtros.orderByPreco,
    );
    expect(result).toEqual(retorno);
    expect(service.buscarTodasUnidades).toHaveBeenCalledWith(filtros);
  });

  it('deve listar unidade por ID', async () => {
    const retorno = { id: 1, preco: 100000 };
    mockService.buscarUnidadePorId.mockResolvedValue(retorno);

    const result = await controller.listarUnidadePorId(1);
    expect(result).toEqual(retorno);
    expect(service.buscarUnidadePorId).toHaveBeenCalledWith(1);
  });

  it('deve editar unidade', async () => {
    const dto: EditarUnidadeDto = { preco: 120000 };
    const retorno = { id: 1, preco: 120000 };
    mockService.editarUnidade.mockResolvedValue(retorno);

    const result = await controller.editarUnidade(1, dto);
    expect(result).toEqual(retorno);
    expect(service.editarUnidade).toHaveBeenCalledWith(1, dto);
  });

  it('deve remover unidade', async () => {
    const retorno = { message: 'Unidade removida com sucesso' };
    mockService.excluirUnidade.mockResolvedValue(retorno);

    const result = await controller.RemoverUnidade(1);
    expect(result).toEqual(retorno);
    expect(service.excluirUnidade).toHaveBeenCalledWith(1);
  });
});