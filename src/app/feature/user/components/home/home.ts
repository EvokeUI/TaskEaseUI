import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/modals/user.modal';
import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  userId: string = '';
  userDetails!: User;
  pendingTaskCount: number = 0;
  progressTaskCount: number = 0;
  completedTaskCount: number = 0;
  totalTasks: number = 0;
  todayCompletedTask: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router){}
  ngOnInit(): void {
    this.route.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);

      this.pendingTaskCount = this.userDetails.tasks.filter(t => t.status === 'pending').length;
      this.progressTaskCount = this.userDetails.tasks.filter(t => t.status === 'in-progress').length
      this.completedTaskCount = this.userDetails.tasks.filter(t => t.status === 'completed').length
      this.totalTasks = this.userDetails.tasks.length;

      const today = new Date().toISOString().split('T')[0];
      this.todayCompletedTask = this.userDetails.tasks.filter(t => t.completionDate === today).length;

    });

    });

  }

  createTask(id: string){
    this.router.navigate(['/user/dashboard/' + id + "/create-task"]);
  }

   manageTask(id: string){
    this.router.navigate(['/user/dashboard/' + id + "/manage-task"]);
  }

   taskList(id: string){
    this.router.navigate(['/user/dashboard/' + id + "/task-list"]);
  }


}
