import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, User } from '../../feature/auth/modals/user.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endPoint: string = "http://localhost:3000/users";

  constructor(private http: HttpClient){}

  getAllUers(): Observable<User[]>{
    return this.http.get<User[]>(this.endPoint);
  }


}
