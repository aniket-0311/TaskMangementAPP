import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        // console.log("LOGGED IN!");
      })
    )
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
  }

  logout() {
    this.removeSession();

    this.router.navigateByUrl('/login');
  }

  getAccessToken(){
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken:string){
    return localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }

  setRefreshToken(refreshToken:string){
    return localStorage.setItem('x-refresh-item', refreshToken);
  }

  getUserId(){
    return localStorage.getItem('user-id');
  }

  getNewAccessToken(){
    return this.http.get(`${this.webService.ROOT_URL}/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken()!,
        '_id': this.getUserId()!
      },
      observe: 'response'
    }).pipe(
      tap((res:HttpResponse<any>) =>{
        this.setAccessToken(res.headers.get('x-access-token')!)
      })
    );
  }

  private setSession(userId: string, accessToken: string | null, refreshToken: string | null) {
    localStorage.setItem('user-id', userId);
    if (accessToken !== null && refreshToken !== null) {
      localStorage.setItem('x-access-token', accessToken);
      localStorage.setItem('x-refresh-token', refreshToken);
    } else {
      console.error('access token, or refresh token is null.');
      this.router.navigate(['/login']);
    }
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

}
