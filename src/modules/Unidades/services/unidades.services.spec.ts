import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesService } from './unidades.service';
import { UnidadeRepository } from '../repositories/unidades.repository';
import { EmpreendimentoRepository } from '../../Empreendimentos/repositories/empreendimentos.repository';
import { BadRequestException } from '@nestjs/common';
import { CriarUnidadeDto } from '../dtos/criarUnidadeDto';
import { EditarUnidadeDto } from '../dtos/editarUnidadeDto';

describe('UnidadesService', () => {
  let service: UnidadesService;
  let unidadeRepo: UnidadeRepository;
  let empreendimentoRepo: EmpreendimentoRepository;

  const mockUnidadeRepo = {
    adicionarUnidade: jest.fn(),
    retornarTodasUnidades: jest.fn(),
    retornaUnidadePorId: jest.fn(),
    editarUnidade: jest.fn(),
    excluirUnidade: jest.fn(),
  };

  const mockEmpreendimentoRepo = {
    retornaEmpreendimentoPorId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnidadesService,
        { provide: UnidadeRepository, useValue: mockUnidadeRepo },
        { provide: EmpreendimentoRepository, useValue: mockEmpreendimentoRepo },
      ],
    }).compile();

    service = module.get<UnidadesService>(UnidadesService);
    unidadeRepo = module.get<UnidadeRepository>(UnidadeRepository);
    empreendimentoRepo = module.get<EmpreendimentoRepository>(EmpreendimentoRepository);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarUnidade', () => {
    it('deve criar unidade com sucesso', async () => {
      const dto: CriarUnidadeDto = {
        preco: 100000,
        status: 1,
        empreendimento_id: 1,
        torre: 'Torre A',
        numero: '101',
        metro_quadrado: 75,
      };
      const empreendimento = { id: 1 };
      const unidade = { id: 1, ...dto };

      mockEmpreendimentoRepo.retornaEmpreendimentoPorId.mockResolvedValue(empreendimento);
      mockUnidadeRepo.adicionarUnidade.mockResolvedValue(unidade);

      const result = await service.criarUnidade(dto);
      expect(result).toEqual(unidade);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockEmpreendimentoRepo.retornaEmpreendimentoPorId.mockRejectedValue(new Error());
      await expect(service.criarUnidade({} as CriarUnidadeDto)).rejects.toThrow(
        new BadRequestException('Erro ao criar Unidade'),
      );
    });
  });

  describe('buscarTodasUnidades', () => {
    it('deve retornar unidades com sucesso', async () => {
      const retorno = [{ id: 1 }];
      mockUnidadeRepo.retornarTodasUnidades.mockResolvedValue(retorno);

      const result = await service.buscarTodasUnidades({ page: 1, limit: 10 });
      expect(result).toEqual(retorno);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockUnidadeRepo.retornarTodasUnidades.mockRejectedValue(new Error());
      await expect(service.buscarTodasUnidades()).rejects.toThrow(
        new BadRequestException('Erro ao buscar Unidades'),
      );
    });
  });

  describe('buscarUnidadePorId', () => {
    it('deve retornar unidade por ID', async () => {
      const unidade = { id: 1 };
      mockUnidadeRepo.retornaUnidadePorId.mockResolvedValue(unidade);

      const result = await service.buscarUnidadePorId(1);
      expect(result).toEqual(unidade);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockUnidadeRepo.retornaUnidadePorId.mockRejectedValue(new Error());
      await expect(service.buscarUnidadePorId(1)).rejects.toThrow(
        new BadRequestException('Erro ao buscar Unidade'),
      );
    });
  });

  describe('editarUnidade', () => {
    it('deve editar unidade com sucesso', async () => {
      const dto: EditarUnidadeDto = {
        preco: 120000,
        status: 2,
        empreendimento_id: 1,
        torre: 'Torre B',
        numero: '102',
        metro_quadrado: 80,
      };
      const empreendimento = { id: 1 };
      const retorno = { id: 1, ...dto };

      mockEmpreendimentoRepo.retornaEmpreendimentoPorId.mockResolvedValue(empreendimento);
      mockUnidadeRepo.editarUnidade.mockResolvedValue(retorno);

      const result = await service.editarUnidade(1, dto);
      expect(result).toEqual(retorno);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockEmpreendimentoRepo.retornaEmpreendimentoPorId.mockRejectedValue(new Error());
      await expect(service.editarUnidade(1, {} as EditarUnidadeDto)).rejects.toThrow(
        new BadRequestException('Erro ao editar Unidade'),
      );
    });
  });

  describe('excluirUnidade', () => {
    it('deve excluir unidade com sucesso', async () => {
      const unidade = { id: 1 };
      mockUnidadeRepo.retornaUnidadePorId.mockResolvedValue(unidade);
      mockUnidadeRepo.excluirUnidade.mockResolvedValue(undefined);

      const result = await service.excluirUnidade(1);
      expect(result).toEqual({ message: 'Unidade removida com sucesso' });
    });

    it('deve lançar exceção ao falhar', async () => {
      mockUnidadeRepo.retornaUnidadePorId.mockRejectedValue(new Error());
      await expect(service.excluirUnidade(1)).rejects.toThrow(
        new BadRequestException('Erro ao excluir unidade'),
      );
    });
  });
});