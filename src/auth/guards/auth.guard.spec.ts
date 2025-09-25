import { AuthGuard } from './auth.guard';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  const mockJwtService = {
    verify: jest.fn(),
  };

  beforeEach(() => {
    jwtService = mockJwtService as any;
    guard = new AuthGuard(jwtService);
  });

  const createMockContext = (authHeader?: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    } as ExecutionContext;
  };

  it('deve permitir acesso com token válido', async () => {
    const payload = { id: 1, email: 'teste@email.com' };
    mockJwtService.verify.mockReturnValue(payload);

    const context = createMockContext('Bearer valid-token');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(mockJwtService.verify).toHaveBeenCalledWith('valid-token');
  });

  it('deve lançar exceção se o header estiver ausente', async () => {
    const context = createMockContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Token não fornecido'),
    );
  });

  it('deve lançar exceção se o formato do token for inválido', async () => {
    const context = createMockContext('InvalidFormat');
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Token inválido'),
    );
  });

  it('deve lançar exceção se o token for inválido ou expirado', async () => {
    mockJwtService.verify.mockImplementation(() => {
      throw new Error('Token inválido');
    });

    const context = createMockContext('Bearer invalid-token');
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Token inválido ou expirado'),
    );
  });
});