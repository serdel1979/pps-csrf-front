import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(user: UserLogin):Observable<UserLogin>{
    return this.http.post<any>('http://localhost:5000/auth/login', user);
  }
}
