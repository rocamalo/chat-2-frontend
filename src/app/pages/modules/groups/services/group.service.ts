import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddGroupResponse } from '../interfaces/add-group-response.interface';
import { DeleteGroupResponse } from '../interfaces/delete-group-response.interface';
import { GroupResponse } from '../interfaces/group-response.interface';
import { Group } from '../interfaces/group.interface';
import { UpdateGroupResponse } from '../interfaces/update-group-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {


  private baseUrl: string = `${environment.baseUrl}/api/groups`;

  private groupsSubject = new BehaviorSubject<any>([]);
  public groups$ = this.groupsSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.refreshData();
  }


  getAll(): Observable<Group[]> {
    return this.http.get<GroupResponse>(this.baseUrl).pipe(
      map(response => this.deleteUnnecessaryPropertyFromArray(response.groups, '__v')),
      catchError( this.handleError)
    )
  }

  update(data: any, id: string): Observable<UpdateGroupResponse> {
    return this.http.put<UpdateGroupResponse>(`${this.baseUrl}/${id}`, data).pipe(
       tap(response => this.refreshData()), //allows to updated data on list-group component
      catchError(error => throwError ( () =>  {
       return new Error(error);
      }
        ))
    )
  }

  add(data: any): Observable<AddGroupResponse> {
    return this.http.post<AddGroupResponse>(`${this.baseUrl}/new`, data).pipe(
       tap(response => this.refreshData()), //allows to updated data on list-group component
      catchError(error => throwError ( () =>  {
       return new Error(error);
      }
        ))
    )
  }

  delete(id: string): Observable<DeleteGroupResponse> {
    return this.http.delete<DeleteGroupResponse>(`${this.baseUrl}/${id}`).pipe(
       tap(response => this.refreshData()), //allows to updated data on list-group component
      catchError(error => throwError ( () =>  {
       return new Error(error);
      }
        ))
    )
  }

 public refreshData() {
    this.getAll().subscribe( groups => this.groupsSubject.next(groups));
  }


  //TODO MOVE TO UTILS
  deleteUnnecessaryPropertyFromArray(array: any, property: any) {
    return array.map( (element: any) => {
      delete element[property];
      return element;
    })
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
    
    return throwError(() => errorMessage);
  }
}
