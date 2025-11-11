import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
   horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds:number=5;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2),Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.minLength(2)],Validators.pattern('^[a-zA-Z]+$')],
      emailId: ['', [Validators.required, Validators.email]],
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
    this._snackBar.open('Registration succeusfull', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
    this.registerForm.reset();
    // proceed with your logic… e.g., send to server
  }

}
