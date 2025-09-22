import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Empreendimento } from '../../Empreendimentos/entities/empreedimento.entity';
import { StatusUnidade } from '../enums/Status-Unidade.enums';

@Entity('unidades')
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empreendimento, empreendimento => empreendimento.unidades, {
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'empreendimento_id' })
  empreendimento: Empreendimento;

  @Column({length: 100 })
  torre: string;

  @Column({length: 10 })
  numero: string;

  @Column()
  metro_quadrado: number;

  @Column()
  preco: number;
  
  @Column({
    type: 'int',
    default: StatusUnidade.DISPONIVEL,
  })
  status: StatusUnidade;
}
