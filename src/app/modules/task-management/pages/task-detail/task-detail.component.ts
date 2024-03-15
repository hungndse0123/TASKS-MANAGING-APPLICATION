import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from '../../../../data/services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../../../data/models/user-model';
import { UserService } from '../../../../data/services/user/user.service';
import { Task } from '../../../../data/models/task-model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit{
  @ViewChild('addForm') addForm!: TemplateRef<any>;
  @ViewChild('alert') alert!: TemplateRef<any>;
  addFormRef: any;
  alertRef: any;
  currentTaskId!: number;
  currentTask!: Task;
  backText: string = '<- Back to Task List';
  greenButtonClass: string = 'text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700';
  curForm: FormGroup = this.fb.group({
    assigneeId: ['', Validators.required]
  });
  userList!: User[];
  assigneeName: string = '';
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
  }
  ngOnInit(): void {
    this.currentTaskId = Number(this.route.snapshot.paramMap.get('id'));
    this.userList = this.userService.getListUsers();
    this.getNewData();
  }

  onOpenAssign() {
    this.addFormRef = this.modalService.show(this.addForm, { class: 'lmt-dialog' });
  }

  onComplete() {
    this.taskService.changeTaskStatus(this.currentTaskId);
    this.getNewData();
  }

  onSubmit() {
    if (this.curForm.valid) {
      this.taskService.assignTask(this.currentTaskId, this.curForm.get('assigneeId')?.value);
      this.getNewData();
      this.curForm.reset();
      this.addFormRef.hide();
    } else this.alertRef = this.modalService.show(this.alert, { class: 'lmt-dialog' });
  }

  onClose() {
    this.curForm.reset();
    this.addFormRef.hide();
  }

  getNewData() {
    let task = this.taskService.getTaskById(this.currentTaskId);
    if (task) this.currentTask = task;
    this.assigneeName = this.userList.find(i => i.id == this.currentTask.assigneeId)?.name || '';
  }
}
