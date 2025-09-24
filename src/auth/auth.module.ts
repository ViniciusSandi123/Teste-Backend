import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../modules/Usuarios/usuarios.module';
import { AuthService } from './services/auth.serivce';
import { JwtService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { jwtConstants } from './keys/constants';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
