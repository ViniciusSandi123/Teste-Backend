import { Module } from '@nestjs/common';
import { UnidadesServices } from './services/unidades.services';
import { UnidadesController } from './controllers/unidades.controller';

@Module({
  controllers: [UnidadesController],
  providers: [UnidadesServices],
  exports: [UnidadesServices],
})
export class UnidadesModule {}
