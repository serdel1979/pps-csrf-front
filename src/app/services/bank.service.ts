import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserLogin } from '../login/login.interface';
import { Transferencia } from '../home/transfer.interface';

@Injectable({
  providedIn: 'root'
})
export class BanckService {

  constructor(private http: HttpClient, private cookie: CookieService) { }


  login(user: UserLogin): Observable<UserLogin> {
    return this.http.post<any>('http://localhost:5000/auth/login', user).pipe(map((user: UserLogin) => {
      this.cookie.set('cookie-jwt', user.token, 0.3, '/');
      return user;
    }));
  }

  transferir(transf: Transferencia): Observable<Transferencia> {
    return this.http.post<any>('http://localhost:5000/transferir', transf);
  }


  getTransferencias(): Observable<Transferencia[]> {
    return this.http.get<any>('http://localhost:5000/transferencias');
  }


  logout() {
    this.cookie.delete('cookie-jwt', '/');
  }


}
