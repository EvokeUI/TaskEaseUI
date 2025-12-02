import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCard, MatCardSubtitle, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute } from '@angular/router';
import { Task, User } from '../../../auth/modals/user.modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

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
  filteredTasks: Task[] = [];

  private searchSubject = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    // Load user tasks
    this.route.parent?.paramMap.subscribe(params => {
      this.currUserId = params.get('id') || '';

      this.taskService.getAllUers().subscribe((users: User[]) => {
        const currentUser = users.find(u => u.id === this.currUserId);
        this.tasks = currentUser?.tasks || [];
        this.filteredTasks = [...this.tasks];   // initially show full list
      });
    });

    // Apply debounce logic
    this.searchSubject
      .pipe(
        debounceTime(300),         // wait 300ms after typing stops
        distinctUntilChanged()     // only react if value changed
      )
      .subscribe((searchText) => {
        this.applyFilter(searchText);
      });
  }

  // Triggered on user input
  onSearch(event: any) {
    const searchValue = event.target.value;
    this.searchSubject.next(searchValue);
  }

  // Filtering logic
  private applyFilter(searchText: string) {
    if (!searchText) {
      this.filteredTasks = [...this.tasks];
      return;
    }

    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
