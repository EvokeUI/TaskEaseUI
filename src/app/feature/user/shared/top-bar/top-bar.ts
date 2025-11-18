import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/modals/user.modal';
import { UserService } from '../../../../core/services/user-service';
 
 
@Component({
  selector: 'app-top-bar',
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,FormsModule,MatFormField,CommonModule,MatInputModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  constructor(private route:ActivatedRoute,private router: Router,private userService:UserService) {}
 
  searchQuery:string='';
  userDetails!: User;
  userId: any;
 
 
    ngOnInit(): void {
      this.route.params.subscribe((res) =>{
      this.userId = res['id'];
      console.log(this.userId);
 
      this.userService.getUserById(this.userId).subscribe((res: User) =>{
      this.userDetails = res;
      console.log(this.userDetails);

      
    });





  }
 
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }
 
  clearSearch(): void {
    this.searchQuery = '';
  }
 
  goProfileSettings(id:any){
    this.router.navigate(['user/dashboard/' + id + "/profile"]);
  }
 
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/taskease/login']);
  }
}