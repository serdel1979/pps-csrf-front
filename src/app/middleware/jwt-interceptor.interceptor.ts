import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //let token = this.cookie.get('cookie-jwt');
    const jwt = localStorage.getItem('token');
    let req = request;
    if(jwt){
        req = request.clone({
          setHeaders: {
            authorization: `Bearer ${jwt}`
          }
        });
    }   

    return next.handle(req);
  }
}