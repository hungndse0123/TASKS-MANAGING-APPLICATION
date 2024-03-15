import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../data/services/user/user.service';
import { TaskService } from '../../../../data/services/task/task.service';
import { Task } from '../../../../data/models/task-model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../data/models/user-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('alert') alert!: TemplateRef<any>;
  addFormRef: any;
  alertRef: any;
  allTaskList!: Task[];
  taskList!: Task[];
  currentUser!: User;
  searchByTitle!: string;
  isUserFilter: boolean = false;
  selectedStatus: string = 'All';
  dropdownList: string[] = ['All', 'Completed', 'In Progress'];
  greenButtonClass: string = 'text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700';
  curNewTaskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    assigneeId: ['']
  });
  userList!: User[];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.allTaskList = this.taskService.getListTasks();
    this.taskList = this.allTaskList;
    this.currentUser = this.userService.getCurrentUser();
    this.userList = this.userService.getListUsers();
  }

  onNavigate(id: number) {
    this.router.navigate(["detail", id], { relativeTo: this.route });
  }

  onSearchByTitleChange(value: string) {
    this.searchByTitle = value;
    this.loadData();
  }

  onIsUserFilterChange(value: boolean) {
    this.isUserFilter = value;
    this.loadData();
  }

  onSelectedStatusChange(value: string) {
    this.selectedStatus = value;
    this.loadData();
  }

  onCreateInit() {
    this.addFormRef = this.modalService.show(this.addForm, { class: 'lmt-dialog' });
  }

  onClose() {
    this.curNewTaskForm.reset();
    this.addFormRef.hide();
  }

  onSubmit() {
    if (this.curNewTaskForm.valid) {
      let randId = Math.floor(Math.random() * Number.MAX_VALUE);
      while (this.allTaskList.find(x => x.id == randId)) {
        randId = Math.floor(Math.random() * Number.MAX_VALUE);
      }
      let newTask: Task = {
        title: this.curNewTaskForm.get('title')?.value,
        completed: false,
        id: randId,
        assigneeId: this.curNewTaskForm.get('assigneeId')?.value,
        description: this.curNewTaskForm.get('description')?.value,
      };
      this.taskService.createTask(newTask);
      this.getNewData();
      this.curNewTaskForm.reset();
      this.addFormRef.hide();
    } else this.alertRef = this.modalService.show(this.alert, { class: 'lmt-dialog' });
  }

  loadData() {
    let filteredData = this.allTaskList.filter((x: Task) => (this.searchByTitle ? x.title.toLowerCase().includes(this.searchByTitle.toLowerCase()) : true)
      && (this.isUserFilter ? x.assigneeId == this.currentUser.id : true)
      && (this.selectedStatus != 'All' ? (this.selectedStatus == 'Completed' ? x.completed == true : x.completed == false) : true));
    this.taskList = filteredData;
  }

  getNewData() {
    this.allTaskList = this.taskService.getListTasks();
    this.loadData();
  }
}
