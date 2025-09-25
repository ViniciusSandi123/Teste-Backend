import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeRepository } from '../repositories/unidades.repository';
import { Unidade } from '../entities/unidade.entity';
import { Empreendimento } from '../../Empreendimentos/entities/empreendimento.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, Type } from '@nestjs/common';

describe('UnidadeRepository', () => {
  let repository: UnidadeRepository;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnidadeRepository,
        {
          provide: getRepositoryToken(Unidade),
          useValue: mockRepo,
        },
      ],
    }).compile();

    repository = module.get<UnidadeRepository>(UnidadeRepository);
  });

  it('deve adicionar uma unidade', async () => {
    const data = {
      torre: 'Torre A',
      numero: '101',
      metro_quadrado: 75,
      preco: 100000,
      status: 1,
    };
    const empreendimento: Empreendimento = { id: 1, cidade: 'Caxias' } as Empreendimento;
    const entity = { id: 1, ...data, empreendimento };

    mockRepo.create.mockReturnValue(entity);
    mockRepo.save.mockResolvedValue(entity);

    const result = await repository.adicionarUnidade(data, empreendimento);
    expect(result).toEqual(entity);
    expect(mockRepo.create).toHaveBeenCalledWith({ ...data, empreendimento });
    expect(mockRepo.save).toHaveBeenCalledWith(entity);
  });

  it('deve retornar unidades com filtros', async () => {
    const queryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{ id: 1 }]),
    };
    mockRepo.createQueryBuilder.mockReturnValue(queryBuilder);

    const filtros = { status: 1, precoMin: 50000, page: 1, limit: 10 };
    const result = await repository.retornarTodasUnidades(filtros);
    expect(result).toEqual([{ id: 1 }]);
  });

  it('deve lançar exceção se nenhuma unidade for encontrada', async () => {
    const queryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    };
    mockRepo.createQueryBuilder.mockReturnValue(queryBuilder);

    await expect(repository.retornarTodasUnidades({})).rejects.toThrow(
      new NotFoundException('Nenhuma Unidade não encontrada'),
    );
  });

  it('deve retornar unidade por ID', async () => {
    const unidade = { id: 1, torre: 'A' };
    mockRepo.findOne.mockResolvedValue(unidade);

    const result = await repository.retornaUnidadePorId(1);
    expect(result).toEqual(unidade);
    expect(mockRepo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['empreendimento', 'favoritos'],
    });
  });

  it('deve lançar exceção se unidade por ID não existir', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(repository.retornaUnidadePorId(1)).rejects.toThrow(
      new NotFoundException('Unidade não encontrada'),
    );
  });

  it('deve editar unidade existente', async () => {
    const unidadeExistente = { id: 1, torre: 'A' };
    const unidadeAtualizada = { id: 1, torre: 'B' };
    const empreendimento = { id: 2 } as Empreendimento;

    mockRepo.findOne.mockResolvedValueOnce(unidadeExistente); 
    mockRepo.update.mockResolvedValue(undefined);
    mockRepo.findOne.mockResolvedValueOnce(unidadeAtualizada);

    const result = await repository.editarUnidade(1, { torre: 'B' }, empreendimento);
    expect(result).toEqual(unidadeAtualizada);
  });

  it('deve excluir unidade existente', async () => {
    const unidade = { id: 1 };
    mockRepo.findOne.mockResolvedValue(unidade);
    mockRepo.delete.mockResolvedValue(undefined);

    await expect(repository.excluirUnidade(1)).resolves.toBeUndefined();
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar exceção ao excluir unidade inexistente', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(repository.excluirUnidade(1)).rejects.toThrow(
      new NotFoundException('Unidade não encontrada'),
    );
  });
});