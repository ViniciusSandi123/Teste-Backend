import { Injectable } from '@nestjs/common';
import { Usuarios } from '../entities/usuarios.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuarios[] = [];

  create(usuarios: Partial<Usuarios>): Usuarios {
    const newUsuarios: Usuarios = {
      id: this.usuarios.length + 1,
      ...usuarios,
    } as Usuarios;
    this.usuarios.push(newUsuarios);
    return newUsuarios;
  }

  findAll(): Usuarios[] {
    return this.usuarios;
  }

  findById(id: number): Usuarios | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  findByEmail(email: string): Usuarios | undefined {
    return this.usuarios.find(u => u.email === email);
  }
}
