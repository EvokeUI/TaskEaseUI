import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { ManageTasks } from './components/manage-tasks/manage-tasks';
import { CreateTasks } from './components/create-tasks/create-tasks';
import { TaskList } from './components/task-list/task-list';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: UserDashboard,
    children: [
      {
        path: '', component: Home
      },
      {
        path: 'profile', component: Profile
      },
      {
        path: 'manage-task', component: ManageTasks
      },
      {
        path: 'create-task', component: CreateTasks
      },
      {
        path: 'task-list', component: TaskList
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
