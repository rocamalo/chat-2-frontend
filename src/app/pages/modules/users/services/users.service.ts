import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersResponse } from '../interfaces/UsersResponse.interface';
import { BehaviorSubject, tap, catchError, Observable, throwError, map, merge, scan, delay } from 'rxjs';
import { User } from '../interfaces/User.interface';
import { UserUpdatedResponse } from '../interfaces/UserUpdatedResponse.interface';
import { UserAddedResponse } from '../interfaces/UserAddedResponse.interface';
import { DeletedUserResponse } from '../interfaces/DeletedUserResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = `${environment.baseUrl}/api/users`;

  //allows to add and updated/added user to our users array
  private onEditSubject = new BehaviorSubject<User>({_id: '', name: '', role: '', email: ''}); //ACTION STREAM  CHECK TO CHANGE THIS TO A SUBJECT
  updatedUser$ = this.onEditSubject.asObservable();

  //old method
  // private usersSubject = new BehaviorSubject<User[]>([]);
  // usersObservable$ = this.usersSubject.asObservable();
  
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoadingAction$ = this.isLoadingSubject.asObservable();
  

  constructor( private http: HttpClient) {
    //this.setUsersToObservable() //old method
    this.isLoadingSubject.next(true);
   }

   //old method
  //  getAllUsers(): Observable<User[]>  {
  //   return this.http.get<UsersResponse>(this.baseUrl).pipe(
  //     map( response => response.users),
  //     catchError(this.handleError)
  //   )
  //  }

  //old method
  //  setUsersToObservable() {
  //     this.getAllUsers().subscribe( users => {
  //     console.log(users);
  //     this.usersSubject.next(users)
  //   })
  //  }

  users$ =  this.http.get<UsersResponse>(this.baseUrl).pipe(
    tap( response => console.log(response.users)),
    map( response =>
      response.users
    ),
    tap(() => this.isLoadingSubject.next(false)),
    catchError((error) => this.handleError(error))
  )

  //this does not work!!!
  // usersUpdated$ = combineLatest([
  //   this.usersObservable$, //ALL USERS EMMITED FROM THE HTTP GET
  //   this.updatedUser$  //USER THAT WAS ADDED OR DELETED OR UPDATED
  // ]).pipe(
  //   tap(([users, updatedUser]) => {
  //     if(updatedUser.delete){
  //       //  TODO HANDLE LOGIC FOR DELETEING THE ITEM FROM THE ARRAY
  //       const deletedUsers = users.filter( u => u._id !== updatedUser._id) //aqui ademas de return de los users, emitiriamos un nuevo valor a users$ con .next, pero cuidando que no se ejecute el combineLastest
  //       this.usersSubject.next(deletedUsers);
  //       //return deletedUsers;
  //     }
  //     let newUser: boolean = true;
  //    users.forEach( (u, index) => {
  //     if(u._id === updatedUser._id) {
  //       newUser = false;
  //       users[index] = updatedUser;
  //       this.usersSubject.next(users);
  //     }
  //   }) 
  //   if (updatedUser._id !== '' && newUser ) {
  //     this.usersSubject.next([...users, updatedUser]);
  //     //return [...users, updatedUser];
  //   } 
  //   return users;
     
  // }),
  // map( ([users, u]) => users),
  //   catchError(this.handleError)
  // )

  usersUpdated$ = merge(
    this.users$, //ALL USERS EMMITED FROM THE HTTP GET  ->DATA STREAM
    this.updatedUser$  //USER THAT WAS ADDED OR DELETED OR UPDATED ->ACTION STREAM
  ).pipe(
    scan( (acc, value) => 
      (value instanceof Array) ? [...value] : this.modifyUsers(acc, value), [] as User[])
    )
  

    //allows to modify array according to the operation add/delete/update
    modifyUsers(users: User[], updatedUser: User) {
      if(updatedUser.delete) {
        return users.filter( u => u._id !== updatedUser._id);
      } 
      let newUser: boolean = true;
         users.forEach( (u, index) => {
          if(u._id === updatedUser._id) {
            newUser = false;
            users[index] = updatedUser;
          }
        });
        if(updatedUser._id !== '' && newUser) {
          return [...users, updatedUser];
        }
      return users;
    }

  //this one when adding a new user works
  // usersUpdated$ = merge(
  //   this.users$,
  //   this.updatedUser$
  // ).pipe(
  //   scan((acc: any, value: any) =>
  //     (value instanceof Array) ? [...value] : [...acc, value], [] as User[])
  // )


  add(data: User) {
    const url = `${environment.baseUrl}/api/auth/new`
    return this.http.post<UserAddedResponse>(url, data).pipe(
      tap(response => this.onEditSubject.next(response.usuario)),
      catchError(this.handleError)
    )
  }

  update(data: User) {
    return this.http.put<UserUpdatedResponse>(`${this.baseUrl}/${data._id}`, data).pipe(
      tap(user => this.onEditSubject.next(user.usuario)),
      catchError(this.handleError)
    )
  }

  delete(data: User) {
    const url = `${this.baseUrl}/${data._id}`
    return this.http.delete<DeletedUserResponse>(url).pipe(
      tap(response => this.onEditSubject.next(data)),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {  //this err comes directly from the interceptor
    console.error(err);
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err}`; //err.status   
    }
    
    this.isLoadingSubject.next(false);
    return throwError(() => errorMessage);
  }
}
