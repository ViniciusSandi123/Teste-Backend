import { Usuario } from './modules/Usuarios/entities/usuario.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './modules/Usuarios/usuarios.module'
import { EmpreendimentosModule } from './modules/Empreendimentos/empreendimentos.module';
import { UnidadesModule } from './modules/Unidades/unidades.module';
import { Empreendimento } from './modules/Empreendimentos/entities/empreendimento.entity';
import { Unidade } from './modules/Unidades/entities/unidade.entity';
import { FavoritosModule } from './modules/Favoritos/favoritos.module';
import { Favorito } from './modules/Favoritos/entities/favorito.entity';
import { AuthModule } from './auth/auth.module';

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
      entities: [Usuario,Empreendimento,Unidade,Favorito],
      synchronize: false,
    }),
    UsuariosModule,
    EmpreendimentosModule,
    UnidadesModule,
    FavoritosModule,
    AuthModule
  ],
})
export class AppModule {}
