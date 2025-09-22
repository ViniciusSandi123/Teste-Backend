import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('empreendimentos')
export class Empreendimentos{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length : 100})
    nome: string;

    @Column({length : 100})
    cidade: string;

    @Column({length : 2})
    Uf: string;

}