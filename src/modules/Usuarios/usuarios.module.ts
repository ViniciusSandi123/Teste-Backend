import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
