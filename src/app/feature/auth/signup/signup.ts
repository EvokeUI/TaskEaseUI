import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user-service';
@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  MatCardModule
],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
   registerForm!: FormGroup;
  submitted = true;
  private _snackBar = inject(MatSnackBar);
  private userService=inject(UserService);
   horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds:number=5;
  registrationError!: string;


  constructor(private fb: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2),Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2)],Validators.pattern('^[a-zA-Z]+$')],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator('password', 'confirmPassword')
    });
  }

  // custom validator to check that two controls match
  passwordsMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey);
      const confirm = group.get(confirmPasswordKey);
      if (password && confirm && password.value !== confirm.value) {
        confirm.setErrors({ notMatching: true });
        return { notMatching: true };
      }
      return null;
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log('Form Value', this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe({
      next: (createdUser) => {
      console.log('Registration successful:', createdUser);
      this._snackBar.open('Registration was successfull', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
        // this.registerForm.reset();
        this.submitted=false;
        setTimeout(()=>{
        this.router.navigate(['/taskease/login']);

        },1000);

      // maybe navigate to login page or show success message
    },
    error: (err: Error) => {
      // err.message contains the user-friendly message from our handleError
      this.registrationError = err.message;
      this._snackBar.open('something went wrong,please try again later', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
    this.registerForm.reset();
    this.submitted=false;
      // you can show this in the template (e.g., via a mat-error or some alert)
    }
  
    }

    )
  }

}
