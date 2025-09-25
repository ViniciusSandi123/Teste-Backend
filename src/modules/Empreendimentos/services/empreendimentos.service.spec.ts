import { Test, TestingModule } from '@nestjs/testing';
import { EmpreendimentosService } from './empreendimentos.service';
import { EmpreendimentoRepository } from '../repositories/empreendimentos.repository';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';
import { BadRequestException } from '@nestjs/common';

describe('EmpreendimentosService', () => {
  let service: EmpreendimentosService;
  let repository: EmpreendimentoRepository;

  const mockRepository = {
    adicionarEmpreendimento: jest.fn(),
    retornarTodosEmpreendimentos: jest.fn(),
    retornaEmpreendimentoPorId: jest.fn(),
    editarEmpreendimento: jest.fn(),
    excluirEmpreendimento: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpreendimentosService,
        {
          provide: EmpreendimentoRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmpreendimentosService>(EmpreendimentosService);
    repository = module.get<EmpreendimentoRepository>(EmpreendimentoRepository);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarEmpreendimento', () => {
    it('deve criar com sucesso', async () => {
      const dto: CriarEmpreendimentoDto = { nome: 'Novo', cidade: 'Caxias', Uf: 'RS' };
      const retorno = { id: 1, ...dto };
      mockRepository.adicionarEmpreendimento.mockResolvedValue(retorno);

      const result = await service.criarEmpreendimento(dto);
      expect(result).toEqual(retorno);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.adicionarEmpreendimento.mockRejectedValue(new Error());
      await expect(service.criarEmpreendimento({ nome: '', cidade: '', Uf: '' })).rejects.toThrow(
        new BadRequestException('Erro ao criar Empreendimento'),
      );
    });
  });

  describe('buscarTodosEmpreendimentos', () => {
    it('deve retornar lista', async () => {
      const lista = [{ id: 1, nome: 'A' }];
      mockRepository.retornarTodosEmpreendimentos.mockResolvedValue(lista);

      const result = await service.buscarTodosEmpreendimentos();
      expect(result).toEqual(lista);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornarTodosEmpreendimentos.mockRejectedValue(new Error());
      await expect(service.buscarTodosEmpreendimentos()).rejects.toThrow(
        new BadRequestException('Erro ao buscar todos Empreendimentos'),
      );
    });
  });

  describe('buscarEmpreendimentoPorId', () => {
    it('deve retornar empreendimento', async () => {
      const retorno = { id: 1, nome: 'A' };
      mockRepository.retornaEmpreendimentoPorId.mockResolvedValue(retorno);

      const result = await service.buscarEmpreendimentoPorId(1);
      expect(result).toEqual(retorno);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornaEmpreendimentoPorId.mockRejectedValue(new Error());
      await expect(service.buscarEmpreendimentoPorId(1)).rejects.toThrow(
        new BadRequestException('Erro ao buscar Empreendimento'),
      );
    });
  });

  describe('editarEmpreendimento', () => {
    it('deve editar com sucesso', async () => {
      const dto: EditarEmpreendimentoDto = { nome: 'Atualizado' };
      const retorno = { id: 1, ...dto };
      mockRepository.editarEmpreendimento.mockResolvedValue(retorno);

      const result = await service.editarEmpreendimento(1, dto);
      expect(result).toEqual(retorno);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.editarEmpreendimento.mockRejectedValue(new Error());
      await expect(service.editarEmpreendimento(1, { nome: '' })).rejects.toThrow(
        new BadRequestException('Erro ao editar Empreendimento'),
      );
    });
  });

  describe('excluirEmpreendimento', () => {
    it('deve excluir com sucesso', async () => {
      const empreendimento = { id: 1, nome: 'A' };
      mockRepository.retornaEmpreendimentoPorId.mockResolvedValue(empreendimento);
      mockRepository.excluirEmpreendimento.mockResolvedValue({ message: 'Empreendimento removido com sucesso' });

      await expect(service.excluirEmpreendimento(1)).resolves.toBeUndefined();
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornaEmpreendimentoPorId.mockRejectedValue(new Error());
      await expect(service.excluirEmpreendimento(1)).rejects.toThrow(
        new BadRequestException('Erro ao excluir Empreendimento'),
      );
    });
  });
});