import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  verifyUser(username: string) {
    return this.http.get<any[]>(this.userURL).pipe(
      map((users) => {
        const user = users.find((u) => u.email === username);
        if (user) {
          return { status: 200, message: 'User found..', userId: user.id };
        } else {
          return { status: 404, message: 'User not found.!!' };
        }
      }),
      catchError((error) => {
        return throwError(() => ({
          status: 'error',
          message:
            error.message || 'Something went wrong while verifying the user...!',
        }));
      })
    );
  }

 resetPassword(new_password: string, confirm_password: string, userid: string) {
  if (new_password !== confirm_password) {
    return throwError(() => ({
      status: 'error',
      message: 'Passwords do not match!',
    }));
  }

  const updateData = {
    password: new_password,
  };

  return this.http.patch(`${this.userURL}/${userid}`, updateData).pipe(
    map(() => ({
      status: 200,
      message: 'Password updated successfully! redirecting to login page...!',
    })),
    catchError((error) =>
      throwError(() => ({
        status: 'error',
        message: error.message || 'Something went wrong while resetting password!',
      }))
    )
  );
}

}
