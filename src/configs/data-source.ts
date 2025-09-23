import { Empreendimento } from '../modules/Empreendimentos/entities/empreedimento.entity';
import { Usuario } from '../modules/Usuarios/entities/usuario.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Unidade } from '../modules/Unidades/entities/unidade.entity';
import { Favorito } from '../modules/Favoritos/entities/favorito.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Usuario,Empreendimento,Unidade,Favorito],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
