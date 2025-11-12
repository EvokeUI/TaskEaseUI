import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
})
export class ForgotPassword {
  constructor(private auth: AuthService, private router: Router) {}

  username: string = '';
  message: string = '';
  isSuccess: boolean = false;

  forgotPassword() {
    this.auth.verifyUser(this.username).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.isSuccess = true;
          this.message = 'User verified successfully...!';
          setTimeout(() =>{
            this.router.navigate(['/taskease/reset-password/', res.userId]);
          }, 1000);
        } else {
          this.isSuccess = false;
          this.message = res.message || 'User not found!';
        }
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.message || 'Something went wrong!';
      },
    });
  }
}
