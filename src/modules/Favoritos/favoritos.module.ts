import { Module } from '@nestjs/common';
import { FavoritosService } from './services/favoritos.service';
import { FavoritosController } from './controllers/favoritos.controller';
import { FavoritoRepository } from './repositories/favoritos.repository';
import { Favorito } from './entities/favorito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito])],
  controllers: [FavoritosController],
  providers: [FavoritoRepository,FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
