import { Injectable } from '@nestjs/common';
import { Empreendimento } from '../entities/empreedimento.entity';

@Injectable()
export class EmpreendimentosServices{
    private empreendimentos: Empreendimento[] = [];

    create(empreendimentos: Partial<Empreendimento>): Empreendimento {
        const newEmprendimentos: Empreendimento = {
          id: this.empreendimentos.length + 1,
          ...empreendimentos,
        } as Empreendimento;
        this.empreendimentos.push(newEmprendimentos);
        return newEmprendimentos;
      }
    
      findAll(): Empreendimento[] {
        return this.empreendimentos;
      }
    
      findById(id: number): Empreendimento | undefined {
        return this.empreendimentos.find(u => u.id === id);
      }
}