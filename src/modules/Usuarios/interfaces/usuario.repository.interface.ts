import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepositoryInterface {
  criarUsuario(data: Partial<Usuario>): Promise<Usuario>;
  retornarTodosUsuarios(): Promise<Usuario[]>;
  retornaUsuarioPorId(id: number): Promise<Usuario | null>;
  retornaUsuarioPorEmail(email: string): Promise<Usuario | null>;
  alterarUsuario(id: number, data: Partial<Usuario>): Promise<Usuario>;
  excluirUsuario(id: number): Promise<void>;
}
