import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCard, MatCardSubtitle, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute } from '@angular/router';
import { Task, User } from '../../../auth/modals/user.modal';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepickerToggle, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatCardContent, 
    
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker
],
  templateUrl: 'task-list.html',
  styleUrls: ['task-list.css'],
})
export class TaskList implements OnInit {

  currUserId: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedDate: Date | null = null;
  
  private searchSubject = new Subject<string>();
  private currentSearchText: string = '';

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
        this.filteredTasks = [...this.tasks];
        this.applyFilter();
      });
    });

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        this.currentSearchText = searchText;
        this.applyFilter(searchText);
      });
  }

  onSearch(event: any) {
    const searchValue = event.target.value;
    this.searchSubject.next(searchValue);
  }
  
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.applyFilter(this.currentSearchText);
  }

  clearDateFilter(): void {
    this.selectedDate = null;
    this.applyFilter(this.currentSearchText);
  }

  private applyFilter(searchText: string = '') {
    const isSameDay = (date1: Date, date2: Date): boolean => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    };
    
    let tempTasks = this.tasks.filter(task => 
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (this.selectedDate) {
      tempTasks = tempTasks.filter(task => {
        const taskDate = new Date(task.createdDate);
        return isSameDay(taskDate, this.selectedDate!);
      });
    }
    
    this.filteredTasks = tempTasks;
  }
}