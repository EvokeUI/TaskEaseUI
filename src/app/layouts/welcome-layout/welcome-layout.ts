import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../feature/admin/admin-routing-module";
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-welcome-layout',
  imports: [AdminRoutingModule, RouterOutlet, MatCardModule],
  templateUrl: './welcome-layout.html',
  styleUrl: './welcome-layout.css',
})
export class WelcomeLayout {

}
