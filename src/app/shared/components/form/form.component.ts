import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/utils/form-validator';
import { ModalComponent } from '../modal/modal.component';
import { UsersService } from '../../../pages/modules/users/services/users.service';
import { matchingFields } from 'src/app/utils/customValidators';
import { catchError, EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  @ViewChild('confirmationAdded') swalConfirmationAdded: any;
  @ViewChild('confirmationUpdated') swalConfirmationUpdated: any;

  matcher = new MyErrorStateMatcher();
  myForm!: FormGroup;

  @Input() userData: any = {};

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    private usersService: UsersService
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submitData() {
    if(this.userData.add){
      this.usersService.add(this.myForm.value).pipe(catchError(error => {
        this.errorMessageSubject.next(error);
        return EMPTY;
      })).subscribe( response => {
        this.swalConfirmationAdded.fire().then( (resp: any) => this.onCancel());
      })
    } else if (this.userData.edit) {
      this.usersService.update(this.myForm.value).pipe(catchError(error => {
        this.errorMessageSubject.next(error);
        return EMPTY;
      })).subscribe( response => {
        this.swalConfirmationUpdated.fire().then( (resp: any) => this.onCancel());
      })
    }
    
  }

  onCancel() {
    this.dialogRef.close();
  }

  initForm() {
    if (this.userData.add) {
      console.log("adding!!!");
      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['',[Validators.required]] // el 3 argumento son validaciones asincronas
      }, {
        validators: matchingFields('password', 'password2')
      })
    } else {
      console.log("edit!!!");
      this.myForm = this.fb.group({
      _id: [this.userData._id, []],
      name: [this.userData.name, [Validators.required]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      role: [this.userData.role, [Validators.required]],
    })
    }
    
  }

}
