import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      criacaoUsuario: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do AuthGuard
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('criarUsuario', () => {
    it('deve criar um novo usuário', async () => {
      const dto = { email: 'teste@exemplo.com', senha: '123456', nome: 'Teste' };
      const retorno = { id: 1, email: dto.email, nome: dto.nome };

      mockAuthService.criacaoUsuario.mockResolvedValue(retorno);

      const result = await controller.criarUsuario(dto);
      expect(result).toEqual(retorno);
    });

    it('deve lançar BadRequestException em erro', async () => {
      const dto = { email: '', senha: '', nome: '' };
      mockAuthService.criacaoUsuario.mockRejectedValue(
        new BadRequestException('Erro na criacao do Usuario'),
      );

      await expect(controller.criarUsuario(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('deve retornar access_token em login válido', async () => {
      const dto = { email: 'teste@exemplo.com', senha: '123456' };
      const retorno = { access_token: 'jwt-token' };

      mockAuthService.login.mockResolvedValue(retorno);

      const result = await controller.login(dto);
      expect(result).toEqual(retorno);
    });

    it('deve lançar UnauthorizedException em erro de credencial', async () => {
      const dto = { email: 'teste@exemplo.com', senha: 'errada' };
      mockAuthService.login.mockRejectedValue(
        new UnauthorizedException('Usuario ou senha incorretos'),
      );

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('deve retornar o perfil do usuário autenticado', () => {
      const req = { user: { id: 1, email: 'teste@exemplo.com' } };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});