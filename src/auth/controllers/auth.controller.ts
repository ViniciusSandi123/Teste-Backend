import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.serivce';
import { loginDto } from '../dtos/loginDto';
import { criarUsuarioDto } from '../dtos/criarUsuarioDto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: criarUsuarioDto })
  async criarUsuario(@Body() dto: criarUsuarioDto) {
    return this.authService.criacaoUsuario(dto);
  }

  @Post('login')
  @ApiBody({ type: loginDto })
  async login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
