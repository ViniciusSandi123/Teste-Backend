import { Module } from '@nestjs/common';
import { UnidadesService } from './services/unidades.service';
import { UnidadesController } from './controllers/unidades.controller';
import { Unidade } from './entities/unidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeRepository } from './repositories/unidades.repository';
import { EmpreendimentosModule } from '../Empreendimentos/empreendimentos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unidade]),
    EmpreendimentosModule,
  ],
  controllers: [UnidadesController],
  providers: [UnidadeRepository,UnidadesService],
  exports: [UnidadesService],
})
export class UnidadesModule {}
