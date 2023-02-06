import { Injectable, Inject } from '@nestjs/common';
import { ListensTo } from '@squareboat/nest-events';
import { User } from '@app/interfaces';

@Injectable()
export class AuthService {
  private USERS = new Map<number, User>();

  createUser(user: User) {
    this.USERS.set(user.id, user);

    return { message: "USER ADDED" };
  }

  findUser(id: number) {
    const user = this.USERS.get(id);

    if (!user) {
      return { message: "USER NOT FOUND" };
    }

    return user;
  }

  findUsers() {
    return Array.from(this.USERS, ([_id, user]) => user);
  }

  updateUser(id: number, userUpdate: User) {
    const user = this.USERS.get(id);

    if (!user) {
      return { message: "USER NOT FOUND" };
    }

    this.USERS.set(id, userUpdate);

    return { message: "USER UPDATED" };
  }

  deleteUser(id: number) {
    this.USERS.delete(id);

    return { message: "USER DELETED" };
  }
  }
