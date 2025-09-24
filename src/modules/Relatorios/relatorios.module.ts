import { Module } from '@nestjs/common';
import { RelatoriosController } from '../Relatorios/controllers/Relatorios.controller';
import { RelatoriosService } from '../Relatorios/services/relatorios.services';
import { RelatoriosRepository } from '../Relatorios/repositories/relatorios.repository';

@Module({
  imports: [],
  controllers: [RelatoriosController],
  providers: [
    RelatoriosService,
    RelatoriosRepository
  ],
  exports: [RelatoriosService],
})
export class RelatoriosModule {}
