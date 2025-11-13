import { Component } from '@angular/core';
import { SideBar } from '../shared/side-bar/side-bar';
import { TopBar } from '../shared/top-bar/top-bar';
import { Footer } from '../shared/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SideBar, TopBar, Footer, RouterOutlet],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}
