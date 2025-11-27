import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, User } from '../../feature/auth/modals/user.modal';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endPoint: string = "http://localhost:3000/users";

  constructor(private http: HttpClient){}

  getAllUers(): Observable<User[]>{
    return this.http.get<User[]>(this.endPoint);
  }

deleteTask(userId: string, taskId: string) {
  return this.http.get<any>(`${this.endPoint}/${userId}`).pipe(
    
    switchMap(user => {
      user.tasks = user.tasks.filter((task: any) => task.id !== taskId);

      return this.http.put(`${this.endPoint}/${userId}`, user);
    })
  );
}



}
