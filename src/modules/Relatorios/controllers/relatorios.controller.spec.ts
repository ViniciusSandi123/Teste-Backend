import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from '../services/relatorios.services';
import { RelatorioStatusDto } from '../dtos/relatorioStatusDto';
import { RelatorioCidadeDto } from '../dtos/relatorioCidadeDto';

describe('RelatoriosController', () => {
  let controller: RelatoriosController;
  let service: RelatoriosService;

  const mockService = {
    relatorioUnidadePorStatus: jest.fn(),
    relatorioUnidadePorCidade: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatoriosController],
      providers: [
        {
          provide: RelatoriosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RelatoriosController>(RelatoriosController);
    service = module.get<RelatoriosService>(RelatoriosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar relatório por status', async () => {
    const retorno: RelatorioStatusDto = {
      DISPONIVEL: 10,
      RESERVADO: 5,
      VENDIDO: 2,
    };
    mockService.relatorioUnidadePorStatus.mockResolvedValue(retorno);

    const result = await controller.relatorioUnidadesPorStatus();
    expect(result).toEqual(retorno);
    expect(service.relatorioUnidadePorStatus).toHaveBeenCalled();
  });

  it('deve retornar relatório por cidade', async () => {
    const retorno: RelatorioCidadeDto[] = [
      { cidade: 'Caxias do Sul', total: 12 },
      { cidade: 'Porto Alegre', total: 7 },
    ];
    mockService.relatorioUnidadePorCidade.mockResolvedValue(retorno);

    const result = await controller.relatorioUnidadesPorCidade();
    expect(result).toEqual(retorno);
    expect(service.relatorioUnidadePorCidade).toHaveBeenCalled();
  });
});