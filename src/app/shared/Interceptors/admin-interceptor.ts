import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
    constructor(private autService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (req.url.includes('users')) {
            const userValue = this.autService.userValue;
            const request = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + userValue.token
                },
            });
            return next.handle(request);
        }
        return next.handle(req);
    }

}