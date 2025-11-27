import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatCardHeader, MatCard, MatCardSubtitle, MatCardTitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute } from '@angular/router';
import { Task, User } from '../../../auth/modals/user.modal';
import { MatLabel, MatFormField } from "@angular/material/input";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardHeader,
    MatIcon,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatCardContent,
    MatLabel,
    MatFormField
],
  templateUrl: 'task-list.html',
  styleUrls: ['task-list.css'],
})
export class TaskList implements OnInit {
  currUserId: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    // Initialize Reactive Form
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit(): void {
    // Load user tasks
    this.route.parent?.paramMap.subscribe(params => {
      this.currUserId = params.get('id') || '';

      this.taskService.getAllUers().subscribe((users: User[]) => {
        const currentUser = users.find(u => u.id === this.currUserId);

        this.tasks = currentUser?.tasks || [];
        this.filteredTasks = [...this.tasks]; 

        console.log("Loaded User:", currentUser);
        console.log("Loaded Tasks:", this.tasks);

        
        this.searchForm.get('searchText')?.valueChanges.subscribe(value => {
          this.filteredTasks = this.tasks.filter(task =>
            task.title.toLowerCase().includes(value.toLowerCase())
          );
        });
      });
    });
  }
}
