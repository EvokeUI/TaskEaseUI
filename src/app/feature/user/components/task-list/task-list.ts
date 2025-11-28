import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCard, MatCardSubtitle, MatCardTitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute } from '@angular/router';
import { Task, User } from '../../../auth/modals/user.modal';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardHeader,
    MatIcon,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatCardContent
  ],
  templateUrl: 'task-list.html',
  styleUrls: ['task-list.css'],
})
export class TaskList implements OnInit {
  currUserId: string = '';
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.currUserId = params.get('id') || '';

      this.taskService.getAllUers().subscribe((users: User[]) => {
        const currentUser = users.find(u => u.id === this.currUserId);
        this.tasks = currentUser?.tasks || [];
      });
    });
  }
}
