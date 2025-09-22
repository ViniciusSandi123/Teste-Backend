import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserStatus {
  Ativo = 'Ativo',
  Inativo = 'Inativo',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Ativo })
  status: UserStatus;
}
