import { Injectable } from '@angular/core';
import { Task } from '../../models/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  storedTasks: Task[] = [
    {
      id: 0,
      title: "Install a monitor arm",
      description: "Install a monitor arm description",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      title: "Move the desk",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 2,
      title: "Move the desk2",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: true
    },
    {
      id: 3,
      title: "Move the desk3",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 4,
      title: "Move the desk4",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
      id: 5,
      title: "Move the desk5",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 6,
      title: "Move the desk6",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: true
    },
    {
      id: 7,
      title: "Move the desk7",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 8,
      title: "Move the desk8",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
      id: 9,
      title: "Move the desk9",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 10,
      title: "Move the desk10",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
      id: 11,
      title: "Move the desk11",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    },
    {
      id: 12,
      title: "Move the desk12",
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
      id: 13,
      title: "Move the desk13",
      description: "Move the desk to the new location",
      assigneeId: 333,
      completed: true
    }
  ];

  constructor() { }

  getListTasks() {
    return this.storedTasks;
  }

  getTaskById(id: number) {
    let result = this.storedTasks.find(i => i.id == id);
    return result;
  }

  createTask(task: Task) {
    this.storedTasks.unshift(task);
  }

  assignTask(taskId: number, userId: number) {
    let task = this.storedTasks.find(i => i.id == taskId);
    if (task) task.assigneeId = userId;
  }

  changeTaskStatus(taskId: number) {
    let task = this.storedTasks.find(i => i.id == taskId);
    if (task) task.completed = !task.completed;
  }
}
