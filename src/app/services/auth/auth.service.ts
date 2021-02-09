
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User, Roles } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggerIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.readToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggerIn.asObservable();
  }

  get isAdmin$(): Observable<string>{
    return this.role.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
    .post<UserResponse>(`${environment.API_URL}/api/v1/login/authenticate`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveLocalStorage(res);
          this.loggerIn.next(true);
          this.role.next(res.role);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  //Cerrar sesion quita el token del local storage
  logout(): void {
    localStorage.removeItem('user');
    this.loggerIn.next(false);
    this.role.next(null);
    this.router.navigate(['/image-list']);

  }

  //lee el token desde el local storage y verifica si ya expiro
  //Verifica sin el usuario esta logeado
  private readToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      }else{
        this.loggerIn.next(true);
        this.role.next(user.role);
      }
    }
  }

  //Guarda el token en el local storage
  private saveLocalStorage(user: UserResponse): void {
    const { userId, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    console.log(user);

  }

  //Metodo que controla errores de api
  private handlerError(err): Observable<never> {
    let errorMessage = 'An error occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
