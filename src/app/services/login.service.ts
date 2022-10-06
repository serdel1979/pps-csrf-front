import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserLogin } from '../login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookie: CookieService) { }


  login(user: UserLogin):Observable<UserLogin>{
    return this.http.post<any>('http://localhost:5000/auth/login', user).pipe(map((user: UserLogin) => {
      this.cookie.set('cookie-jwt', user.token,0.3,'/');
      return user;
  }));
  }
}
