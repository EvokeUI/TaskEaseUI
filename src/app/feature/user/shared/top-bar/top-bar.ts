import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/input';


@Component({
  selector: 'app-top-bar',
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,MatDivider,FormsModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  constructor(private router: Router) {}

  searchQuery:string='';

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  
  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    // You can later route to a search page or filter dashboard results here
  }
}


