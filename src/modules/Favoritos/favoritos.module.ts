import { AuthModule } from './../../auth/auth.module';
import { Module } from '@nestjs/common';
import { FavoritosService } from './services/favoritos.service';
import { FavoritosController } from './controllers/favoritos.controller';
import { FavoritoRepository } from './repositories/favoritos.repository';
import { Favorito } from './entities/favorito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from '../Unidades/entities/unidade.entity';
import { Usuario } from '../Usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito,Usuario,Unidade]), AuthModule],
  controllers: [FavoritosController],
  providers: [FavoritoRepository,FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
