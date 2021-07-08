
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { UserResponse, User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private loggerIn = new BehaviorSubject<boolean>(false);
  // private role = new BehaviorSubject<Roles>(null);
  // private userToken = new BehaviorSubject<string>(null);

  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.readToken();
  }

  get user$(): Observable<UserResponse>{
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  // get isLogged(): Observable<boolean> {
  //   return this.loggerIn.asObservable();
  // }

  // get isAdmin$(): Observable<string>{
  //   return this.role.asObservable();
  // }

  // get userTokenValue(): string{
  //   return this.userToken.getValue();
  // }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
    .post<UserResponse>(`${environment.API_URL}/api/v1/login/authenticate`, authData)
      .pipe(
        map((res: UserResponse) => {
         
          console.log(res);
          //Revisar esta parte cap 7 del video
          if(res.message == 'ok'){
           
            this.saveLocalStorage(res);
            this.user.next(res);
            // this.loggerIn.next(true);
            // this.userToken.next(res.token);
            // this.role.next(res.role);
            return res;
          }
       

        }),
        catchError((err) => this.handlerError(err))
      );
  }

  //Cerrar sesion quita el token del local storage
  logout(): void {
    localStorage.removeItem('user');
    // this.loggerIn.next(false);
    // this.role.next(null);
    // this.userToken.next(null);
    //console.log('user',this.user);
    this.user.next(null);
    this.router.navigate(['/login']);
    


    //console.log('userVacio',this.user);
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
        // this.loggerIn.next(true);
        // this.role.next(user.role);
        // this.userToken.next(user.token);
        this.user.next(user);
      }
    }
  }

  //Guarda el token en el local storage
  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
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
