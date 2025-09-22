import { Injectable } from '@nestjs/common';
import { Empreendimentos } from '../entities/empreedimentos.entity';

@Injectable()
export class EmpreendimentosServices{
    private empreendimentos: Empreendimentos[] = [];

    create(empreendimentos: Partial<Empreendimentos>): Empreendimentos {
        const newEmprendimentos: Empreendimentos = {
          id: this.empreendimentos.length + 1,
          ...empreendimentos,
        } as Empreendimentos;
        this.empreendimentos.push(newEmprendimentos);
        return newEmprendimentos;
      }
    
      findAll(): Empreendimentos[] {
        return this.empreendimentos;
      }
    
      findById(id: number): Empreendimentos | undefined {
        return this.empreendimentos.find(u => u.id === id);
      }
}