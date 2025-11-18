import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user-service';
import { User } from '../../../auth/modals/user.modal';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe,DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(private route:ActivatedRoute,private router: Router,private userService:UserService) {}

    user: any;
    userDetails!: User;
    userId:any;
    
    ngOnInit(): void {
 
      this.route.parent?.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);

     

      });

    });





  }
}


