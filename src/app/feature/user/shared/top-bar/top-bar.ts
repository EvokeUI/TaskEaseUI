import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-top-bar',
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule,MatDivider,FormsModule,MatFormField,CommonModule,MatInputModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  constructor(private router: Router) {}

  searchQuery:string='';

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // You can trigger a search/filter here, or navigate to a results page
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}


