import { criarUsuarioDto } from './../dtos/criarUsuarioDto';
import { loginDto } from '../dtos/loginDto';
import { perfilUsuarioDto } from '../dtos/perfilUsuarioDto';

export interface UsuarioServiceInterface {
  criarUsuario(dto: criarUsuarioDto);
  loginUsuario(dto: loginDto);
  buscarPorId(id: number);
  obterPerfil(id: number): Promise<perfilUsuarioDto>;
}
