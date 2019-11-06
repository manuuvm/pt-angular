import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model';
import { userEndpoints } from './api.endpoints';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(userEndpoints.userApiRoute);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(userEndpoints.userByIdApiRoute(id));
  }

  newUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(userEndpoints.userApiRoute, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User[]>(userEndpoints.userByIdApiRoute(id));
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(userEndpoints.userApiRoute, user);
  }
}
