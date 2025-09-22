import { Module } from '@nestjs/common';
import { EmpreendimentosServices } from './services/empreendimentos.service';
import { EmprendimentosController } from './controllers/empreendimentos.controller';

@Module({
  controllers: [EmprendimentosController],
  providers: [EmpreendimentosServices],
  exports: [EmpreendimentosServices],
})
export class EmpreendimentosModule {}
