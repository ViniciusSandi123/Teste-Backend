import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';
import { AuthGuard } from '../../../auth/guards/auth.guard';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  const mockService = {
    buscarPorId: jest.fn(),
    obterPerfil: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: mockService,
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue(mockAuthGuard)
    .compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar usuário por ID', async () => {
    const usuario = { id: 1, nome: 'Vinicius' };
    mockService.buscarPorId.mockResolvedValue(usuario);

    const result = await controller.buscarPorId(1);
    expect(result).toEqual(usuario);
    expect(service.buscarPorId).toHaveBeenCalledWith(1);
  });

  it('deve retornar perfil do usuário', async () => {
    const perfil: perfilUsuarioDto = { id: 1, nome: 'Vinicius', email: 'vinicius@email.com' };
    mockService.obterPerfil.mockResolvedValue(perfil);

    const result = await controller.obterPerfil(1);
    expect(result).toEqual(perfil);
    expect(service.obterPerfil).toHaveBeenCalledWith(1);
  });
});
