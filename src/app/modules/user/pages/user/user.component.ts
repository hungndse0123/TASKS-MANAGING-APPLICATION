import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../data/services/user/user.service';
import { User } from '../../../../data/models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  curForm: FormGroup = this.fb.group({
    assigneeId: ['']
  });
  userList!: User[];
  currentUser!: User;
  greenButtonClass: string = 'text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700';

  constructor(private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userList = this.userService.getListUsers();
    this.updateUser();
    this.curForm.get('assigneeId')?.setValue(this.currentUser?.id || '');
  }
  
  changeUser() {
    let userId = this.curForm.get('assigneeId')?.value;
    this.userService.setCurrentUser(userId);
    this.updateUser();
  }

  updateUser() {
    this.currentUser = this.userService.getCurrentUser();
  }
}
