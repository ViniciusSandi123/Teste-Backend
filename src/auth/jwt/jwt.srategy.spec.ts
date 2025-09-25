import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    strategy = new JwtStrategy();
  });

  it('deve estar definido', () => {
    expect(strategy).toBeDefined();
  });

  it('deve validar o payload e retornar o usuário', async () => {
    const payload = { sub: 1, email: 'teste@email.com' };
    const result = await strategy.validate(payload);
    expect(result).toEqual({ id: 1, email: 'teste@email.com' });
  });
});