import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "../../feature/admin/admin-routing-module";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [MatCardModule,CommonModule, AdminRoutingModule, RouterOutlet],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  isLoginMode: boolean = false;

  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
