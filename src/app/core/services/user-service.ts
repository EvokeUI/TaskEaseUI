import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.userURL).pipe(
      map(users => {
        const user = users.find(u => u.email === username && u.password === password);
        
        if (user) {
          return { status: '200', message: 'Login successful', userId: user.id,user  };
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
}
