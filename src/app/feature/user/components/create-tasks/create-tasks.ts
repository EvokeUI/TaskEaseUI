import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../auth/modals/user.modal';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tasks',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule],
  templateUrl: './create-tasks.html',
  styleUrl: './create-tasks.css',
})
export class CreateTasks {

  storyForm!: FormGroup;
  userDetails!: User;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 5;
  // Example options for dropdowns:
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  statuses = ['New', 'In Progress', 'In Review', 'Done'];
  // For assignedTo, you might load from your user list:
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    // ...
  ];
  userId: any;
  fullName!: string;
  today: Date = new Date();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((res) => {
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) => {
        this.userDetails = res;
        console.log(this.userDetails);
        this.fullName = this.userDetails.firstName + "" + this.userDetails.lastName;
      });

    });

    this.storyForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.required],
      acceptanceCriteria: ['', Validators.required],
      storyPoints: [null, [Validators.required, Validators.min(0)]],
      priority: ['Medium', Validators.required],
      status: ['New'],
      assignedTo: [this.fullName],
      dueDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.storyForm.invalid) {
      this.storyForm.markAllAsTouched();
      return;
    }
    const formValue = this.storyForm.value;
    // Create a Task object for JSON server
    const newTask = {
      id: Date.now().toString(),
      title: formValue.title,
      description: formValue.description,
      acceptanceCriteria: formValue.acceptanceCriteria,
      storyPoints: formValue.storyPoints,
      priority: formValue.priority,
      status: formValue.status,
      assignedTo: formValue.assignedTo,
      createdDate: new Date().toISOString().slice(0, 10),
      dueDate: formValue.dueDate.toISOString().slice(0, 10)
    };
    console.log(newTask);
    this.userService.addTaskToUser(this.userId, newTask).subscribe(() => {
      console.log('Task added successfully');
      this.storyForm.reset();
      this._snackBar.open('Task created successfully', 'Done', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      // setTimeout(()=>{
      //   this.router.navigate(['/user/dashboard/${this.userId}']);

      //   },1000);
    },
      (err: Error) => {
        this._snackBar.open('something went wrong,please try again later', 'Done', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      });
  }

  // Optional: helper to check if a control is invalid
  getControl(name: string) {
    return this.storyForm.get(name);
  }

}
