import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'detail/:id',
    component: TaskDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
