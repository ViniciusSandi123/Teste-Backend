import { UsuarioServiceInterface } from './interfaces/usuario.service.interface';
import { UsuarioRepositoryInterface } from '../Usuarios/interfaces/usuario.repository.interface';
import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioRepository,UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
