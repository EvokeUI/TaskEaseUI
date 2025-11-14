import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../auth/modals/user.modal';
import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  userId: string = '';
  userDetails!: User;

  constructor(private route: ActivatedRoute, private userService: UserService){}
  ngOnInit(): void {
    this.route.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);
    });

    });

  }

}
