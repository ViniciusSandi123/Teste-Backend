import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];

  create(usuarios: Partial<Usuario>): Usuario {
    const newUsuarios: Usuario = {
      id: this.usuarios.length + 1,
      ...usuarios,
    } as Usuario;
    this.usuarios.push(newUsuarios);
    return newUsuarios;
  }

  findAll(): Usuario[] {
    return this.usuarios;
  }

  findById(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  findByEmail(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email);
  }
}
