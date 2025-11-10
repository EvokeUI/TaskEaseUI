import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatInputModule,MatButtonModule,MatCardModule,MatCheckboxModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit{
  constructor(private userService: UserService){}

  username: string = '';
  password: string = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('Login form submitted with', this.username, this.password);
  }

  ngOnInit(): void {
    this.userService.login(this.username, this.password).subscribe((res) =>{
      console.log(res);
    });
  }
  
}
