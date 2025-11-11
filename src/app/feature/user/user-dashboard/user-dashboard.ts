import { Component } from '@angular/core';
import { TopBar } from '../shared/top-bar/top-bar';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Footer } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [TopBar, Sidebar, Footer, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {

}
