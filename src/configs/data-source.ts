import { Empreendimentos } from './../modules/Empreendimentos/entities/empreedimentos.entity';
import { Usuarios } from '../modules/Usuarios/entities/usuarios.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Usuarios,Empreendimentos],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
