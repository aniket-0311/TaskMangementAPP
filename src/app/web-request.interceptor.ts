import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, empty, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {
  refreshingAccessToken!: boolean;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>,next:HttpHandler): Observable<any>{
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        // console.log(error);
        if(error.status === 401 && !this.refreshingAccessToken){
          // Refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() =>{
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) =>{
                // console.log(err);
                this.authService.logout();
                return empty();
              })
            )
        }
        return throwError(error);
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>){
    // get Access Token
    const token = this.authService.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token':token
        }
      })
    }
    return request;
  }

  refreshAccessToken(){
    // call method in auth service to refresh access token
    this.refreshingAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(() =>{
        this.refreshingAccessToken = false;
        console.log("Access Token refreshed")
      })
    )
  }
}
function swtchMap(arg0: () => Observable<import("@angular/common/http").HttpEvent<any>>): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

