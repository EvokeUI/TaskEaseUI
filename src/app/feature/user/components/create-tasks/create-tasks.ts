import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

  // Example options for dropdowns:
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  statuses = ['New', 'In Progress', 'In Review', 'Done'];
  // For assignedTo, you might load from your user list:
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    // ...
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.storyForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.required],
      acceptanceCriteria: ['', Validators.required],
      storyPoints: [null, [Validators.required, Validators.min(0)]],
      priority: ['Medium', Validators.required],
      status: ['New', Validators.required],
      assignedTo: [null, Validators.required],
      dueDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.storyForm.valid) {
      console.log('Form value:', this.storyForm.value);
      // Call your service to save the story / user story
    } else {
      this.storyForm.markAllAsTouched();
    }
  }

  // Optional: helper to check if a control is invalid
  getControl(name: string) {
    return this.storyForm.get(name);
  }

}
