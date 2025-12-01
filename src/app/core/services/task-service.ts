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

updateTask(userId: string, updatedTask: any) {
  return this.http.get<User[]>(this.endPoint).pipe(
    map((users: User[]) => {
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error("User not found");

      const tasks = users[userIndex].tasks;

      const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
      if (taskIndex === -1) throw new Error("Task not found");

      tasks[taskIndex] = updatedTask; // update task

      // Replace tasks on the user
      users[userIndex].tasks = [...tasks];

      return users[userIndex]; // return updated user
    }),
    switchMap((updatedUser: User) =>
      this.http.put<User>(`${this.endPoint}/${updatedUser.id}`, updatedUser)
    )
  );
}




}
