import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [MatDialogTitle,
    MatDialogContent, MatDialogModule, MatDialogActions,
    MatButtonModule, MatDialogClose,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,],
  templateUrl: './edit-task-dialog.html',
  styleUrl: './edit-task-dialog.css',
})
export class EditTaskDialog {
  storyForm!: FormGroup;
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<EditTaskDialog>
  ) { }
  ngOnInit(): void {

    // Create form and pre-populate with selected task values  
    this.storyForm = this.fb.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(200)]],
      description: [this.data.description, Validators.required],
      acceptanceCriteria: [this.data.acceptanceCriteria, Validators.required],
      storyPoints: [this.data.storyPoints, [Validators.required, Validators.min(0)]],
      priority: [this.data.priority || 'Medium', Validators.required],
      status: [this.data.status || 'New'],
      assignedTo: [{ value: this.data.assignedTo, disabled: true }],
      completionDate: [this.data.completionDate, Validators.required]
    });
    
  }

  save() {
    const updatedTask = {
      ...this.data,
      ...this.storyForm.getRawValue()    // includes disabled fields
    };
    console.log(updatedTask);
    this.dialog.close(updatedTask);       // return updated task
  }

  close() {
    this.dialog.close(null);           // no changes
  }
   getControl(name: string) {
    return this.storyForm.get(name);
  }
}
