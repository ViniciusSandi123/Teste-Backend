import { Test, TestingModule } from '@nestjs/testing';
import { EmpreendimentoRepository } from './empreendimentos.repository';
import { Empreendimento } from '../entities/empreendimento.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EmpreendimentoRepository', () => {
  let repository: EmpreendimentoRepository;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpreendimentoRepository,
        {
          provide: getRepositoryToken(Empreendimento),
          useValue: mockRepo,
        },
      ],
    }).compile();

    repository = module.get<EmpreendimentoRepository>(EmpreendimentoRepository);
  });

  it('deve adicionar um empreendimento', async () => {
    const data = { nome: 'Novo', cidade: 'Caxias' };
    const entity = { id: 1, ...data };
    mockRepo.create.mockReturnValue(entity);
    mockRepo.save.mockResolvedValue(entity);

    const result = await repository.adicionarEmpreendimento(data);
    expect(result).toEqual(entity);
    expect(mockRepo.create).toHaveBeenCalledWith(data);
    expect(mockRepo.save).toHaveBeenCalledWith(entity);
  });

  it('deve retornar todos os empreendimentos', async () => {
    const empreendimentos = [{ id: 1, nome: 'A' }];
    mockRepo.find.mockResolvedValue(empreendimentos);

    const result = await repository.retornarTodosEmpreendimentos();
    expect(result).toEqual(empreendimentos);
  });

  it('deve lançar exceção se nenhum empreendimento for encontrado', async () => {
    mockRepo.find.mockResolvedValue([]);

    await expect(repository.retornarTodosEmpreendimentos()).rejects.toThrow(
      new NotFoundException('Nenhum empreendimento encontrado'),
    );
  });

  it('deve retornar empreendimento por ID', async () => {
    const empreendimento = { id: 1, nome: 'A' };
    mockRepo.findOne.mockResolvedValue(empreendimento);

    const result = await repository.retornaEmpreendimentoPorId(1);
    expect(result).toEqual(empreendimento);
  });

  it('deve lançar exceção se empreendimento por ID não existir', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(repository.retornaEmpreendimentoPorId(1)).rejects.toThrow(
      new NotFoundException('Empreendimento não encontrado'),
    );
  });

  it('deve editar empreendimento existente', async () => {
    const existente = { id: 1, nome: 'Antigo' };
    const atualizado = { id: 1, nome: 'Novo' };

    mockRepo.findOne.mockResolvedValueOnce(existente); // check existence
    mockRepo.update.mockResolvedValue(undefined);
    mockRepo.findOne.mockResolvedValueOnce(atualizado); // return updated

    const result = await repository.editarEmpreendimento(1, { nome: 'Novo' });
    expect(result).toEqual(atualizado);
  });

  it('deve lançar exceção ao editar empreendimento inexistente', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(repository.editarEmpreendimento(1, {})).rejects.toThrow(
      new NotFoundException('Empreendimento não encontrado'),
    );
  });

  it('deve excluir empreendimento existente', async () => {
    const existente = { id: 1, nome: 'A' };
    mockRepo.findOne.mockResolvedValue(existente);
    mockRepo.delete.mockResolvedValue(undefined);

    const result = await repository.excluirEmpreendimento(1);
    expect(result).toEqual({ message: 'Empreendimento removido com sucesso' });
  });

  it('deve lançar exceção ao excluir empreendimento inexistente', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(repository.excluirEmpreendimento(1)).rejects.toThrow(
      new NotFoundException('Empreendimento não encontrado'),
    );
  });
});