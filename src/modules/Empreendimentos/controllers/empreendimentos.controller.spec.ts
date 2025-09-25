import { Test, TestingModule } from '@nestjs/testing';
import { EmpreendimentosController } from './empreendimentos.controller';
import { EmpreendimentosService } from '../services/empreendimentos.service';
import { CriarEmpreendimentoDto } from '../dtos/criarEmpreendimentoDto';
import { EditarEmpreendimentoDto } from '../dtos/editarEmpreeendimentoDto';

describe('EmpreendimentosController', () => {
  let controller: EmpreendimentosController;
  let service: EmpreendimentosService;

  const mockService = {
    criarEmpreendimento: jest.fn(),
    buscarTodosEmpreendimentos: jest.fn(),
    buscarEmpreendimentoPorId: jest.fn(),
    editarEmpreendimento: jest.fn(),
    excluirEmpreendimento: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpreendimentosController],
      providers: [
        {
          provide: EmpreendimentosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmpreendimentosController>(EmpreendimentosController);
    service = module.get<EmpreendimentosService>(EmpreendimentosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um empreendimento', async () => {
    const dto: CriarEmpreendimentoDto = { nome: 'Novo Empreendimento', cidade: 'Caxias', Uf: 'RS' };
    const retorno = { id: 1, ...dto };
    mockService.criarEmpreendimento.mockResolvedValue(retorno);

    const result = await controller.criar(dto);
    expect(result).toEqual(retorno);
    expect(service.criarEmpreendimento).toHaveBeenCalledWith(dto);
  });

  it('deve listar todos os empreendimentos', async () => {
    const retorno = [{ id: 1, nome: 'Empreendimento A' }];
    mockService.buscarTodosEmpreendimentos.mockResolvedValue(retorno);

    const result = await controller.listarTodos();
    expect(result).toEqual(retorno);
  });

  it('deve buscar empreendimento por ID', async () => {
    const retorno = { id: 1, nome: 'Empreendimento A' };
    mockService.buscarEmpreendimentoPorId.mockResolvedValue(retorno);

    const result = await controller.buscarPorId(1);
    expect(result).toEqual(retorno);
    expect(service.buscarEmpreendimentoPorId).toHaveBeenCalledWith(1);
  });

  it('deve editar um empreendimento', async () => {
    const dto: EditarEmpreendimentoDto = { nome: 'Atualizado' };
    const retorno = { id: 1, ...dto };
    mockService.editarEmpreendimento.mockResolvedValue(retorno);

    const result = await controller.editar(1, dto);
    expect(result).toEqual(retorno);
    expect(service.editarEmpreendimento).toHaveBeenCalledWith(1, dto);
  });

  it('deve excluir um empreendimento', async () => {
    const retorno = { message: 'Empreendimento excluído com sucesso' };
    mockService.excluirEmpreendimento.mockResolvedValue(retorno);

    const result = await controller.excluir(1);
    expect(result).toEqual(retorno);
    expect(service.excluirEmpreendimento).toHaveBeenCalledWith(1);
  });
});