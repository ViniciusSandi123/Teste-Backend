import { Module } from '@nestjs/common';
import { FavoritosServices } from './services/favoritos.service';
import { FavoritosController } from './controllers/favoritos.controller';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosServices],
  exports: [FavoritosServices],
})
export class FavoritosModule {}
