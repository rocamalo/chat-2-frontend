import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Subject, tap } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../interfaces/User.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { InterceptorService } from 'src/app/interceptors/interceptor.service';





@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsersComponent  {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  @ViewChild('confirmationDeleted') swalConfirmationDeleted: any;



  private filteringBehaviorSubject = new BehaviorSubject<string>('');
  filteringObservable$ = this.filteringBehaviorSubject.asObservable();

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

    // Whether data is currently loading
  isLoading$ = this.usersService.isLoadingAction$;



  users$ = combineLatest([
    this.usersService.usersUpdated$,
    this.filteringObservable$
  ])
  .pipe(
    map(([users, filter]) =>
        users.filter( u =>
          u.name.trim().toLowerCase().includes(filter)
        )),
    catchError(error => {
      console.warn("Here we would handle an error message showed in the UI");
      console.log(error);
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  )

  displayedColumns: string[] = ['_id', 'name', 'email', 'role', 'details', 'edit', 'delete'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {

    const filterValue: any = (event.target as HTMLInputElement).value;
    this.filteringBehaviorSubject.next(filterValue.trim().toLowerCase());
    //this.dataSource.filter = filterValue.trim().toLowerCase();

}

goToDetails(user: User) {
  console.log(user._id);
  this.dialog.open(ModalComponent, {
    data: {
      details: true,
      edit: false,
      add: false,
      title: `Details for ${user._id}`,
      name: user.name,
      email: user.email,
      role: user.role
    },
  });
}

goToEdit(user: User) {
  console.log(user._id);
  this.dialog.open(ModalComponent, {
    data: {
      details: false,
      edit: true,
      add: false,
      title: `Editing information for ${user._id}`,
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id
    },
  });
}

addUser() {
  this.dialog.open(ModalComponent, {
    data: {
      details: false,
      edit: false,
      add: true,
      title: `Add new user`,
    },
  });
}

deleteUser(user: User) {
  console.log(user);
  const userToDelete = {...user, delete: true};
    this.usersService.delete(userToDelete).subscribe( response => {
      this.swalConfirmationDeleted.fire();
    })

}

}

