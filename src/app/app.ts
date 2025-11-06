import { Component, signal } from '@angular/core';
import { Welcome } from './shared/welcome/welcome';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-ease-app');
  isLoggedIn: boolean = true;
}
