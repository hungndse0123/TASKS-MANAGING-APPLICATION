import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  storedUsers: User[] = [
    { id: 111, name: "Mike" },
    { id: 222, name: "James" },
    { id: 333, name: "Hung" }
  ];

  currentUser!: User;

  constructor() { }

  setCurrentUser(userId: number) {
    let user = this.storedUsers.find(i => i.id == userId);
    if (user) this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getListUsers() {
    return this.storedUsers;
  }
}
