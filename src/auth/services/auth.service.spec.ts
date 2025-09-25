import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '../../modules/Usuarios/services/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsuariosService: any;
  let mockJwtService: any;

  beforeEach(async () => {
    mockUsuariosService = {
      loginUsuario: jest.fn(),
      criarUsuario: jest.fn(),
    };

    mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: mockUsuariosService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('deve retornar access_token em login válido', async () => {
      const dto = { email: 'teste@exemplo.com', senha: '123456' };
      const usuario = { id: 1, email: dto.email };
      const token = 'jwt-token';

      mockUsuariosService.loginUsuario.mockResolvedValue(usuario);
      mockJwtService.signAsync.mockResolvedValue(token);

      const result = await service.login(dto);
      expect(result).toEqual({ access_token: token });
    });

    it('deve lançar UnauthorizedException se credenciais forem inválidas', async () => {
      const dto = { email: 'teste@exemplo.com', senha: 'errada' };
      mockUsuariosService.loginUsuario.mockRejectedValue(
        new UnauthorizedException('Usuario ou senha incorretos'),
      );

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar BadRequestException em erro inesperado', async () => {
      const dto = { email: 'teste@exemplo.com', senha: '123456' };
      mockUsuariosService.loginUsuario.mockRejectedValue(new Error('Erro'));

      await expect(service.login(dto)).rejects.toThrow(BadRequestException);
      await expect(service.login(dto)).rejects.toThrow('Erro ao obter token');
    });
  });

  describe('criacaoUsuario', () => {
    it('deve retornar usuário criado com sucesso', async () => {
      const dto = { email: 'novo@exemplo.com', senha: '123456', nome: 'Novo' };
      const usuarioCriado = { id: 1, email: dto.email, nome: dto.nome };

      mockUsuariosService.criarUsuario.mockResolvedValue(usuarioCriado);

      const result = await service.criacaoUsuario(dto);
      expect(result).toEqual(usuarioCriado);
    });

    it('deve lançar BadRequestException em erro inesperado', async () => {
      const dto = { email: '', senha: '', nome: '' };
      mockUsuariosService.criarUsuario.mockRejectedValue(new Error('Erro'));

      await expect(service.criacaoUsuario(dto)).rejects.toThrow(BadRequestException);
      await expect(service.criacaoUsuario(dto)).rejects.toThrow('Erro na criacao do Usuario');
    });

    it('deve propagar BadRequestException lançada pelo UsuariosService', async () => {
      const dto = { email: '', senha: '', nome: '' };
      mockUsuariosService.criarUsuario.mockRejectedValue(
        new BadRequestException('Email inválido'),
      );

      await expect(service.criacaoUsuario(dto)).rejects.toThrow(BadRequestException);
      await expect(service.criacaoUsuario(dto)).rejects.toThrow('Email inválido');
    });
  });
});