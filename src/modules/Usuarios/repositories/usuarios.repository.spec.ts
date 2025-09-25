import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { Usuario } from '../entities/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioRepository,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepo,
        },
      ],
    }).compile();

    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('deve estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('criarUsuario', () => {
    it('deve criar usuário com sucesso', async () => {
      const data = { nome: 'Vinicius', email: 'vinicius@email.com' };
      const usuario = { id: 1, ...data };

      mockRepo.create.mockReturnValue(usuario);
      mockRepo.save.mockResolvedValue(usuario);

      const result = await repository.criarUsuario(data);
      expect(result).toEqual(usuario);
      expect(mockRepo.create).toHaveBeenCalledWith(data);
      expect(mockRepo.save).toHaveBeenCalledWith(usuario);
    });
  });

  describe('retornaUsuarioPorId', () => {
    it('deve retornar usuário por ID', async () => {
      const usuario = { id: 1, nome: 'Vinicius' };
      mockRepo.findOne.mockResolvedValue(usuario);

      const result = await repository.retornaUsuarioPorId(1);
      expect(result).toEqual(usuario);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar exceção se usuário não for encontrado', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(repository.retornaUsuarioPorId(1)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado'),
      );
    });
  });

  describe('retornaUsuarioPorEmail', () => {
    it('deve retornar usuário por email', async () => {
      const usuario = { id: 1, email: 'vinicius@email.com' };
      mockRepo.findOne.mockResolvedValue(usuario);

      const result = await repository.retornaUsuarioPorEmail('vinicius@email.com');
      expect(result).toEqual(usuario);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { email: 'vinicius@email.com' } });
    });

    it('deve retornar null se email não for encontrado', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      const result = await repository.retornaUsuarioPorEmail('naoexiste@email.com');
      expect(result).toBeNull();
    });
  });
});