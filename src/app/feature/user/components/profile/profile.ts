import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../auth/modals/user.modal';
import { UpperCasePipe } from '@angular/common';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe,MatFormFieldModule,MatLabel,MatInputModule,ReactiveFormsModule,MatDialogActions,MatDialogContent,MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(private route:ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private fb:FormBuilder,
    private dialog:MatDialog
  ) {}

    user: any;
    userDetails!: User;
    userId:any;
    nameForm:any;
    emailForm:any;
    passwordForm:any;
    hideOld = true;
    hideNew = true;
    hideConfirm = true;
    
    ngOnInit(): void {

      this.nameForm = this.fb.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required]
      });
      this.emailForm= this.fb.group({
        email:['',[Validators.required,Validators.email]]
      });

    this.passwordForm = this.fb.group({
    OldPassword: ['', Validators.required],
    NewPassword: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]
  });
 
      this.route.parent?.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);     
      // this.nameForm.patchValue(res);
      // this.emailForm.patchValue(res);
      });
    });
  }

    openDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '420px',
      disableClose: true
    });
    
  }

  saveName() {
    if (this.nameForm.invalid) return;

    this.userService.updateUserName(this.userId, this.nameForm.value)
      .subscribe(() => {
        this.userDetails.firstName = this.nameForm.value.firstName;
        this.userDetails.lastName = this.nameForm.value.lastName;
        this.dialog.closeAll();
      });
  }
  
  saveEmail(){
    if(this.emailForm.invalid) return;
    this.userService.updateEmail(this.userId,this.emailForm.value)
    .subscribe(()=>{
      this.userDetails.email = this.emailForm.value.email;
      this.dialog.closeAll();
    })
  }
savePassword() {
    let form = this.passwordForm.value;

    if (form.NewPassword !== form.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    this.userService.changePassword(this.userId, form)
      .subscribe(() => {
        this.passwordForm.reset();
        this.dialog.closeAll();
      });
  }

  cancel() {
    this.dialog.closeAll();
  }
}


