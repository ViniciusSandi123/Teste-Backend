import { Injectable } from '@nestjs/common';
import { Usuarios } from '../entities/usuarios.enity';

@Injectable()
export class UsuariosService {
  private users: Usuarios[] = [];

  create(user: Partial<Usuarios>): Usuarios {
    const newUser: Usuarios = {
      id: this.users.length + 1,
      ...user,
    } as Usuarios;
    this.users.push(newUser);
    return newUser;
  }

  findAll(): Usuarios[] {
    return this.users;
  }

  findById(id: number): Usuarios | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): Usuarios | undefined {
    return this.users.find(u => u.email === email);
  }
}
