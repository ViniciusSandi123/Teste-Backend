import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosRepository } from './relatorios.repository';
import { DataSource } from 'typeorm';
import { Unidade } from '../../Unidades/entities/unidade.entity';

describe('RelatoriosRepository', () => {
  let repository: RelatoriosRepository;
  let mockQueryBuilder: any;
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
    };

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelatoriosRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    repository = module.get<RelatoriosRepository>(RelatoriosRepository);
  });

  it('deve retornar relatório de unidades por status', async () => {
    const resultado = [
      { status: 'DISPONIVEL', total: 10 },
      { status: 'VENDIDO', total: 5 },
    ];
    mockQueryBuilder.getRawMany.mockResolvedValue(resultado);

    const result = await repository.queryUnidadePorStatus();
    expect(result).toEqual(resultado);
    expect(mockQueryBuilder.select).toHaveBeenCalledWith('unidade.status', 'status');
    expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('COUNT(unidade.id)', 'total');
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('unidade.status');
  });

  it('deve retornar relatório de unidades por cidade', async () => {
    const resultado = [
      { cidade: 'Caxias do Sul', total: 12 },
      { cidade: 'Porto Alegre', total: 7 },
    ];
    mockQueryBuilder.getRawMany.mockResolvedValue(resultado);

    const result = await repository.queryUnidadePorCidade();
    expect(result).toEqual(resultado);
    expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith('unidade.empreendimento', 'empreendimento');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith('empreendimento.cidade', 'cidade');
    expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('COUNT(unidade.id)', 'total');
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('empreendimento.cidade');
  });
});