import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepositoryInterface {
  criarUsuario(data: Partial<Usuario>);
  retornaUsuarioPorId(id: number);
  retornaUsuarioPorEmail(email: string);
}
