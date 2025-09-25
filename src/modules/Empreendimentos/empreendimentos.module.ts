import { Module } from '@nestjs/common';
import { EmpreendimentosService } from './services/empreendimentos.service';
import { EmpreendimentosController } from './controllers/empreendimentos.controller';
import { Empreendimento } from './entities/empreendimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpreendimentoRepository } from './repositories/empreendimentos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Empreendimento])],
  controllers: [EmpreendimentosController],
  providers: [EmpreendimentoRepository,EmpreendimentosService],
  exports: [EmpreendimentoRepository,EmpreendimentosService],
})
export class EmpreendimentosModule {}
