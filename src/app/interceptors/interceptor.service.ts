import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {



  constructor(
    private authService: AuthService
  ) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get("skip")){
      return next.handle(req).pipe(
        catchError( (err) => this.handleError(err) ) //here the arrow function is needed to use THIS
      );
    }
           
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token')!
    });

    const reqClone = req.clone({
      headers
      //params
    });



    return next.handle( reqClone ).pipe(
      catchError( (err) => this.handleError(err) ) //here the arrow function is needed to use THIS
    );


  }


  handleError( err: HttpErrorResponse ) {
    console.log('Sucedió un error');
    console.log('Registrado en el log file');
    console.error(err);
    console.warn(err.status);
    if (err.status === 403 || err.status === 401){
      this.authService.logout();
    }

    return throwError(() => new Error(err.error.msg));
  }

}