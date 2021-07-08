
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/api/v1/users`)
      .pipe(catchError(this.handlerError))
  }

  getById(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/api/v1/users/${userId}`)
      .pipe(catchError(this.handlerError))
  }

  new(user: User): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/api/v1/users`, user)
      .pipe(catchError(this.handlerError))

  }

  update(userId: string, user: User) {
    return this.http.put<User>(`${environment.API_URL}/api/v1/users/${userId}`, user)
      .pipe(catchError(this.handlerError))
  }

  delete(userId: string): Observable<{}> {
    return this.http.delete<User>(`${environment.API_URL}/api/v1/users/${userId}`)
      .pipe(catchError(this.handlerError))
  }

  handlerError(error): Observable<never> {
    let errorMessage = "Error unknown";
    if (error) {
      errorMessage = `Error ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

