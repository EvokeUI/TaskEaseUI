import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,MatInputModule,MatButtonModule,MatCardModule,MatCheckboxModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 username: string = '';
  password: string = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Login form submitted with', this.username, this.password);
  }

}
