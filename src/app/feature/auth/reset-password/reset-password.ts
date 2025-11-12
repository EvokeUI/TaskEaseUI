import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
})
export class ResetPassword implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  new_password: string = '';
  confirm_password: string = '';
  userId: string = '';
  message: string = '';
  isSuccess: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  resetPassword() {
    this.auth.resetPassword(this.new_password, this.confirm_password, this.userId).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.isSuccess = true;
          this.message = res.message;
          setTimeout(() =>{
            this.router.navigate(['/taskease/login']);
          }, 1000);
        } else {
          this.isSuccess = false;
          this.message = res.message || 'Unable to reset password!';
        }
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.message || 'Something went wrong!';
      },
    });
  }
}
