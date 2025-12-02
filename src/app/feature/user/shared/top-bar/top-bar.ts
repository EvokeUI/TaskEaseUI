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
 searchItems = [
  { label: "Profile", keyword: ["profile"], icon: "person", route: "/user/dashboard/:id/profile" },
  { label: "Dashboard", keyword: ["dashboard","home"], icon: "dashboard", route: "/user/dashboard/:id" },
  { label: "ManageTask", keyword: ["tasks","managetasks"], icon: "check_circle", route: "/user/dashboard/:id/manage-task" },
  { label: "TaskList", keyword: ["tasklist"], icon: "check_circle", route: "/user/dashboard/:id/task-list" },
  { label: "CreateTask", keyword: ["creatask","create"], icon: "check_circle", route: "/user/dashboard/:id/create-task" },
  { label: "Settings", keyword: ["settings"], icon: "settings", route: "/user/dashboard/:id/profile" }
  ];

  filteredItems: any[] = [];
 
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
 

filterResults() {
  const query = this.searchQuery.toLowerCase();

  if (!query.trim()) {
    this.filteredItems = [];
    return;
  }

  this.filteredItems = this.searchItems.filter(item =>
    item.keyword.some(keyword => keyword.toLowerCase().includes(query))
  );
}

goTo(route: string) {
  const finalRoute = route.replace(":id", this.userDetails.id);
  this.router.navigate([finalRoute]);

  this.filteredItems = [];
  this.searchQuery = "";
}
  clearSearch(): void {
    this.searchQuery = '';
    this.filteredItems = [];
  }
 


  goProfileSettings(id: any) {
  this.router.navigate([`user/dashboard/${id}/profile`]);
}

 navigateTo(item: any) {
  const route = item.route.replace(":id", this.userId);
  this.router.navigate([route]);

  this.filteredItems = [];
}
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/taskease/login']);
  }
}