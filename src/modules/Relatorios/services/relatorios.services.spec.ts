import { Test, TestingModule } from '@nestjs/testing';
import { RelatoriosService } from '../services/relatorios.services';
import { RelatoriosRepository } from '../repositories/relatorios.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('RelatoriosService', () => {
  let service: RelatoriosService;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      queryUnidadePorStatus: jest.fn(),
      queryUnidadePorCidade: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelatoriosService,
        { provide: RelatoriosRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<RelatoriosService>(RelatoriosService);
  });

  describe('relatorioUnidadePorStatus', () => {
    it('deve retornar relatório de unidades por status', async () => {
      const mockData = [
        { status: 1, total: '5' },
        { status: 2, total: '3' },
        { status: 3, total: '2' },
      ];

      mockRepo.queryUnidadePorStatus.mockResolvedValue(mockData);

      const result = await service.relatorioUnidadePorStatus();
      expect(result).toEqual({
        DISPONIVEL: 5,
        RESERVADO: 3,
        VENDIDO: 2,
      });
    });

    it('deve lançar NotFoundException se resultado estiver vazio', async () => {
      mockRepo.queryUnidadePorStatus.mockResolvedValue([]);

      await expect(service.relatorioUnidadePorStatus()).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException em erro inesperado', async () => {
      mockRepo.queryUnidadePorStatus.mockRejectedValue(new Error('Falha'));

      await expect(service.relatorioUnidadePorStatus()).rejects.toThrow(BadRequestException);
    });
  });

  describe('relatorioUnidadePorCidade', () => {
    it('deve retornar relatório de unidades por cidade', async () => {
      const mockData = [
        { cidade: 'Caxias do Sul', total: '10' },
        { cidade: 'Porto Alegre', total: '7' },
      ];

      mockRepo.queryUnidadePorCidade.mockResolvedValue(mockData);

      const result = await service.relatorioUnidadePorCidade();
      expect(result).toEqual([
        { cidade: 'Caxias do Sul', total: 10 },
        { cidade: 'Porto Alegre', total: 7 },
      ]);
    });

    it('deve lançar NotFoundException se resultado estiver vazio', async () => {
      mockRepo.queryUnidadePorCidade.mockResolvedValue([]);

      await expect(service.relatorioUnidadePorCidade()).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException em erro inesperado', async () => {
      mockRepo.queryUnidadePorCidade.mockRejectedValue(new Error('Falha'));

      await expect(service.relatorioUnidadePorCidade()).rejects.toThrow(BadRequestException);
    });
  });
});