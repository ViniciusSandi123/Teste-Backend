import { Unidade } from '../../Unidades/entities/unidade.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('empreendimentos')
export class Empreendimento{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length : 100})
    nome: string;

    @Column({length : 100})
    cidade: string;

    @Column({length : 2})
    Uf: string;

    @OneToMany(() => Unidade, unidade => unidade.empreendimento)
    unidades: Unidade[];
}