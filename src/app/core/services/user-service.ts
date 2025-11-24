import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry, switchMap } from 'rxjs/operators';
import { Task, User } from '../../feature/auth/modals/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private userURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.userURL).pipe(
      map(users => {
        const user = users.find(u => u.email === username && u.password === password);

        if (user) {
          return { status: '200', message: 'Login successfully...!', userId: user.id, user };
        } else {
          throw new Error('Invalid username or password');
        }
      }),

      catchError(error => {
        return throwError(() => ({
          status: 'error',
          message: error.message || 'Something went wrong during login'
        }));
      })

    );
  }

  register(request: User): Observable<any> {
    return this.http.post<any>(this.userURL, request).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  addTaskToUser(userId: any, newTask: Task) {
    return this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
      switchMap(user => {
        const updatedTasks = [...(user.tasks || []), newTask];
        return this.http.put(`http://localhost:3000/users/${userId}`, {
          ...user,
          tasks: updatedTasks
        });
      }),
      retry(1),
      catchError(this.handleError)

    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Client / network error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server error (code: ${error.status}): ${error.message}`;
      // You may also inspect error.error for backend-specific message
    }
    // Optionally log to some remote logging infrastructure
    console.error(errorMessage);
    // Return an observable with a user-friendly error message
    return throwError(() => new Error(errorMessage));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.userURL + '/' + id);
  }

  updateUserName(id:string,data:any):Observable<User>{
      return this.http.patch<User>(`${this.userURL}/${id}`,data);
  }

  updateEmail(id:string,data:any):Observable<User>{
    return this.http.patch<User>(`${this.userURL}/${id}`,data);
  }
}
