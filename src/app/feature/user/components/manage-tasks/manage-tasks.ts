import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task, User } from '../../../auth/modals/user.modal';
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-manage-tasks',
  imports: [MatTableModule, CommonModule, RouterLink, MatCardModule, MatInputModule, MatDatepickerModule, RouterOutlet, MatIconModule],
  templateUrl: './manage-tasks.html',
  styleUrl: './manage-tasks.css',
})

export class ManageTasks implements OnInit {

  allTasks!: Task[];
  users!: User[];
  currUserId: any = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute){}

  displayedColumns: string[] = ['sno', 'title', 'createdDate', 'status', 'actions'];

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((param) =>{
      this.currUserId = param.get('id');
      console.log(this.currUserId);
    });

    this.taskService.getAllUers().subscribe((res: User[]) =>{
      const currentUser = res.find(u => u.id == this.currUserId);
      this.allTasks = currentUser?.tasks || [];
      console.log(this.allTasks);
    });
    
  }



}
