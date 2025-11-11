import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatCardModule, 
    MatCheckboxModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  constructor(){}
  username: string = '';
  message: string = '';
  isSuccess: boolean = false;
  forgotPassword(){

  }
}
