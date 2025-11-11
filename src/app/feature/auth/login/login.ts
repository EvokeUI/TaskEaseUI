import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatInputModule,MatButtonModule,MatCardModule,MatCheckboxModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit{
  constructor(private userService: UserService, private router: Router){}

  username: string = '';
  password: string = '';
  submitted = false;
  message: string = '';
  isSuccess: boolean = false;
onSubmit() {
  this.submitted = true;
  this.userService.login(this.username, this.password).subscribe({
    next: (res) => {
      this.message = res.message;
      if (res.status == 200) {
        this.isSuccess = true;
        setTimeout(() =>{
          this.router.navigate(['user/dashboard/' + res.userId]);
        }, 1000);
      }
    },
    error: (err) => {
     this.isSuccess = false;
      this.message = err.message || 'Something went wrong!';
    }
  });
}


  ngOnInit(): void {

  }
  
}
