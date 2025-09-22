import { Usuarios } from './modules/Usuarios/entities/usuarios.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './modules/Usuarios/usuarios.module'
import { EmpreendimentosModule } from './modules/Empreendimentos/empreendimentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Usuarios],
      synchronize: false,
    }),
    UsuariosModule,
    EmpreendimentosModule
  ],
})
export class AppModule {}
