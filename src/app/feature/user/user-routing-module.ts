import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboard } from './user-dashboard/user-dashboard';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: UserDashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
