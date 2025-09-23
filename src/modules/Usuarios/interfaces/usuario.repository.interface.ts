import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepositoryInterface {
  criarUsuario(data: Partial<Usuario>);
  retornarTodosUsuarios(): Promise<Usuario[]>;
  retornaUsuarioPorId(id: number);
  retornaUsuarioPorEmail(email: string);
  alterarUsuario(id: number, data: Partial<Usuario>);
  excluirUsuario(id: number);
}
