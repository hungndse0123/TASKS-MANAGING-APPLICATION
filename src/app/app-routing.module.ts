import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(i=>i.HomeModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./modules/task-management/task-management.module').then(i=>i.TaskManagementModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(i=>i.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
