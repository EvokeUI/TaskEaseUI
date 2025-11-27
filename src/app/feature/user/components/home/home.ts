import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/modals/user.modal';
import { UserService } from '../../../../core/services/user-service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatFormFieldModule, FormsModule, MatInput],
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
  todayCreatedTask: number = 0;

  selectedFilter: string = 'today';
  cust_date: string = '';


  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router){}
  ngOnInit(): void {
    this.route.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);

      this.pendingTaskCount = this.userDetails.tasks.filter(t => t.status === 'new').length;
      this.progressTaskCount = this.userDetails.tasks.filter(t => t.status === 'in-progress').length
      this.completedTaskCount = this.userDetails.tasks.filter(t => t.status === 'completed').length
      this.totalTasks = this.userDetails.tasks.length;

      const today = new Date().toISOString().split('T')[0];
      this.cust_date = today;
    });

    });

  }
  onChange(){
   if(!this.cust_date){
    this.todayCreatedTask = 0;
    this.completedTaskCount = 0;
    return;
   }
  //  const selectedDate = new Date(this.cust_date);  
  //  const today = new Date();
   //today.setDate(today);                         
  //  if (selectedDate > today) {
  //   alert("Date can't be in the future.");
  // }

   this.todayCreatedTask = this.userDetails.tasks.filter(t => this.formatDate(t.createdDate) === this.cust_date).length;
   this.todayCompletedTask = this.userDetails.tasks.filter(t => this.formatDate(t.completionDate) === this.cust_date).length;
  }

  formatDate(date: any): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return "";
      }
      return d.toISOString().split('T')[0];
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
