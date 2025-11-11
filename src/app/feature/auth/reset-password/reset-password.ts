import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  constructor(){}
  new_password: string = "";
  confirm_password: string = "";
  message: string = "";
  isSuccess: boolean = false;

  resetPassword(){

  }
}
