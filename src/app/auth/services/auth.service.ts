import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';

import { Router } from '@angular/router';
import { AddedUser, UserAddedResponse } from 'src/app/pages/modules/users/interfaces/UserAddedResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRole: Subject<string> = new Subject();
  public userRole$ = this.userRole.asObservable();
  private baseUrl: string = `${environment.baseUrl}/api/auth`;

  private headers = { //HEADERS TO AVOID THE INTERCEPTOR, IT'S STILL SECURE BECAUSE THE BACKEND IS THE ONE MANAGING THE PRIVILEGES
    headers:{skip:"true"}
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login( email: string, password: string) {

    
    const body = { email, password };
    return this.http.post<AuthResponse>(this.baseUrl, body, this.headers).pipe(
      tap( resp => {
        
        if (resp.ok){
          this.setUserDataToLocalStorage(resp);
        }
      }),
     map( resp => resp.ok ), //extraemos solamente el valor de ok del backend
      catchError( err => { 
        console.warn(err);
        return of(err) 
      })  //of convierte false a un observable porque asi lo requiere catchError
    )

  }


  register( name: string, email: string, password: string, ) {
    const url = `${this.baseUrl}/new`;
    const body = { name, email, password};
    return this.http.post<UserAddedResponse>(url, body, this.headers).pipe(
      tap( resp => {
        if (resp.ok){
          this.setUserDataToLocalStorage(resp.usuario);
        }
      }),
      map(
        resp => resp.ok
      ),
      catchError( err => of(err) )
    )
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/renew`;
    // const headers = new HttpHeaders()
    // .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>(url)
    .pipe(
      map( resp => {
        if (resp.ok) {
          this.setPropertyToLocalStorage('token', resp.token);
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    )
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  setUserDataToLocalStorage(userInformation: AddedUser | AuthResponse): void {
    const { token, name, email, role }  = userInformation;
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name );
    localStorage.setItem('userEmail', email );
    localStorage.setItem('userRole', role );
  }

  setPropertyToLocalStorage(itemName: string, itemValue: string): void {
    localStorage.setItem(itemName, itemValue);
  }
 }
