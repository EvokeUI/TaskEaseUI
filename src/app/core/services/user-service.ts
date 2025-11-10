import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../feature/auth/modals/user.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = "http://localhost:3000/users";
  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

}
