import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Unidade } from '../../Unidades/entities/unidade.entity';
import { RelatorioRepositoryInterface } from '../interfaces/relatorio.repository.interface';

@Injectable()
export class RelatoriosRepository implements RelatorioRepositoryInterface {
  constructor(private readonly dataSource: DataSource) {}

  async queryUnidadePorStatus() {
    const retorno = this.dataSource
      .getRepository(Unidade)
      .createQueryBuilder('unidade')
      .select('unidade.status', 'status')
      .addSelect('COUNT(unidade.id)', 'total')
      .groupBy('unidade.status')
      .getRawMany();
      return retorno;
  }

  async queryUnidadePorCidade() {
    const retorno = this.dataSource
      .getRepository(Unidade)
      .createQueryBuilder('unidade')
      .innerJoin('unidade.empreendimento', 'empreendimento')
      .select('empreendimento.cidade', 'cidade')
      .addSelect('COUNT(unidade.id)', 'total')
      .groupBy('empreendimento.cidade')
      .getRawMany();
      return retorno;
  }
}