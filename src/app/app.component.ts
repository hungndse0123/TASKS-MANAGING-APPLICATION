import { Component, OnInit } from '@angular/core';
import { UserService } from './data/services/user/user.service';
import { User } from './data/models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TASKS-MANAGING-APPLICATION';
  currentUser!: User;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.setCurrentUser(this.userService.storedUsers[0].id);
    this.currentUser = this.userService.getCurrentUser();
  }
}
