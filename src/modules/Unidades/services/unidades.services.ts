import { Injectable } from '@nestjs/common';
import { Unidade } from '../entities/unidade.entity';

@Injectable()
export class UnidadesServices{
    private unidades: Unidade[] = [];

    create(unidades: Partial<Unidade>): Unidade {
        const newUnidades: Unidade = {
          id: this.unidades.length + 1,
          ...unidades,
        } as Unidade;
        this.unidades.push(newUnidades);
        return newUnidades;
      }
    
      findAll(): Unidade[] {
        return this.unidades;
      }
    
      findById(id: number): Unidade | undefined {
        return this.unidades.find(u => u.id === id);
      }
}