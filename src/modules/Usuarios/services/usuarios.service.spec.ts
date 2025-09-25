import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { criarUsuarioDto } from '../../../auth/dtos/criarUsuarioDto';
import { loginDto } from '../../../auth/dtos/loginDto';

jest.mock('bcrypt');

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: UsuarioRepository;

  const mockRepository = {
    retornaUsuarioPorEmail: jest.fn(),
    retornaUsuarioPorId: jest.fn(),
    criarUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: UsuarioRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarUsuario', () => {
    it('deve criar usuário com sucesso', async () => {
      const dto: criarUsuarioDto = {
        nome: 'Vinicius',
        email: 'vinicius@email.com',
        senha: '123456',
      };
      mockRepository.retornaUsuarioPorEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed123');
      const usuarioCriado = { id: 1, nome: dto.nome, email: dto.email, senha: 'hashed123' };
      mockRepository.criarUsuario.mockResolvedValue(usuarioCriado);

      const result = await service.criarUsuario(dto);
      expect(result).toEqual(usuarioCriado);
    });

    it('deve retornar mensagem se email já estiver cadastrado', async () => {
      mockRepository.retornaUsuarioPorEmail.mockResolvedValue({ id: 1 });
      const result = await service.criarUsuario({
        nome: 'Vinicius',
        email: 'vinicius@email.com',
        senha: '123456',
      });
      expect(result).toEqual({ message: 'Email já cadastrado' });
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornaUsuarioPorEmail.mockRejectedValue(new Error());
      await expect(service.criarUsuario({} as criarUsuarioDto)).rejects.toThrow(
        new BadRequestException('Erro ao criar Usuario'),
      );
    });
  });

  describe('loginUsuario', () => {
    it('deve autenticar com sucesso', async () => {
      const dto: loginDto = { email: 'vinicius@email.com', senha: '123456' };
      const usuario = { id: 1, email: dto.email, senha: 'hashed123' };
      mockRepository.retornaUsuarioPorEmail.mockResolvedValue(usuario);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.loginUsuario(dto);
      expect(result).toEqual(usuario);
    });

    it('deve lançar Unauthorized se email não existir', async () => {
      mockRepository.retornaUsuarioPorEmail.mockResolvedValue(null);
      await expect(service.loginUsuario({ email: 'x@email.com', senha: '123' })).rejects.toThrow(
        new UnauthorizedException('Usuario ou senha incorretos'),
      );
    });

    it('deve lançar Unauthorized se senha estiver incorreta', async () => {
      const usuario = { id: 1, email: 'vinicius@email.com', senha: 'hashed123' };
      mockRepository.retornaUsuarioPorEmail.mockResolvedValue(usuario);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.loginUsuario({ email: usuario.email, senha: 'wrong' })).rejects.toThrow(
        new UnauthorizedException('Usuario ou senha incorretos'),
      );
    });

    it('deve lançar BadRequest em erro inesperado', async () => {
      mockRepository.retornaUsuarioPorEmail.mockRejectedValue(new Error());
      await expect(service.loginUsuario({ email: 'x', senha: 'y' })).rejects.toThrow(
        new BadRequestException('Erro ao fazer login do Usuario'),
      );
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar usuário por ID', async () => {
      const usuario = { id: 1, nome: 'Vinicius' };
      mockRepository.retornaUsuarioPorId.mockResolvedValue(usuario);

      const result = await service.buscarPorId(1);
      expect(result).toEqual(usuario);
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornaUsuarioPorId.mockRejectedValue(new Error());
      await expect(service.buscarPorId(1)).rejects.toThrow(
        new BadRequestException('Erro ao buscar Usuario'),
      );
    });
  });

  describe('obterPerfil', () => {
    it('deve retornar perfil do usuário', async () => {
      const usuario = { id: 1, nome: 'Vinicius', email: 'vinicius@email.com' };
      mockRepository.retornaUsuarioPorId.mockResolvedValue(usuario);

      const result = await service.obterPerfil(1);
      expect(result).toEqual({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    });

    it('deve lançar exceção ao falhar', async () => {
      mockRepository.retornaUsuarioPorId.mockRejectedValue(new Error());
      await expect(service.obterPerfil(1)).rejects.toThrow(
        new BadRequestException('Erro ao obter Perfil'),
      );
    });
  });
});