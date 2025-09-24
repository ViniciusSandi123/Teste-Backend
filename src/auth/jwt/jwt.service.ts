import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async gerarToken(payload: { sub: number; email: string }) {
    return await this.jwtService.sign(payload);
  }

  async verificarToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (e) {
      return await null;
    }
  }
}
