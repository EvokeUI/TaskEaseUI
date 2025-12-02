import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task, User } from '../../../auth/modals/user.modal';
import { TaskService } from '../../../../core/services/task-service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { MatSelectModule } from '@angular/material/select';
import { FilterTaskPipe } from '../../shared/pipes/filter-task-pipe';

@Component({
  selector: 'app-manage-tasks',
  imports: [
    MatTableModule, CommonModule, RouterLink, MatCardModule, MatInputModule, MatDatepickerModule,
    RouterOutlet, MatIconModule, FormsModule, ConfirmDialog, MatSelectModule,
    FormsModule,
    FilterTaskPipe
],
  templateUrl: './manage-tasks.html',
  styleUrl: './manage-tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManageTasks implements OnInit {

  allTasks!: Task[];
  users!: User[];
  currUserId: any = '';
  taskName: string = "";
  filteredTasks: any[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute){}

  displayedColumns: string[] = ['sno', 'title', 'createdDate', 'status', 'actions'];
  status: string [] = ["New", "In-Progress", "Completed"];
  selectedStatus: string = "";

  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe((param) =>{
      this.currUserId = param.get('id');
      console.log(this.currUserId);
    });

    this.taskService.getAllUers().subscribe((res: User[]) =>{
      const currentUser = res.find(u => u.id == this.currUserId);
      this.allTasks = currentUser?.tasks || [];
      this.filteredTasks = this.allTasks;
      console.log(this.allTasks);
    });
    
  }


searchTask() {
  //console.log("Inside search task...")
  const search = this.taskName.toLowerCase().trim();

  if (search === "") {
   this.filteredTasks = this.allTasks;
    console.log(this,this.filteredTasks);
    return;
  }

  this.filteredTasks = this.allTasks.filter(task =>
    task.title.toLowerCase().includes(search)
    
  );
}


isOpened: boolean = false;
currentTaskId: string = "";

//responsible for opening the dialog 
openDialog(taskId: string){
  this.isOpened = true;
  this.currentTaskId = taskId;
}

//perform the delete operations...
deleteTask(taskId: string) {
  this.isOpened = true;
  this.taskService.deleteTask(this.currUserId, taskId).subscribe(res => {

    console.log("Task deleted successfully!");
    this.allTasks = this.allTasks.filter(task => task.id !== taskId);
    this.filteredTasks = this.filteredTasks.filter(task => task.id !== taskId);
    
  });
}

// based on the dialog selection it proceeds...
handleConfirmation(result: boolean){
  if(result){
    this.deleteTask(this.currentTaskId);
    this.isOpened = false;
  }else{
    this.isOpened = false;
  }
}

ngOnChanges() {
  //this.applyTaskFilter();  
}

// applyTaskFilter() {
//   this.filteredTasks = this.filterTasK.transform(this.allTasks, this.selectedStatus);
// }


}
