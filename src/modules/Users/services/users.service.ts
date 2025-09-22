import { Injectable } from '@nestjs/common';
import { User } from '../entities/users.enity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user: Partial<User>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
