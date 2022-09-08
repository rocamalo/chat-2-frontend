import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/utils/form-validator';
import { AuthService } from '../services/auth.service';
import { catchError, BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private errorSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorSubject.asObservable();

  @ViewChild('errorLogin') swalErrorLogin: any;

  myForm!: FormGroup;
  errorMessage: string = '';


  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ,) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
    
  }

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe( response => {
      if(typeof response == "boolean") {
        this.router.navigate(['dashboard']);
       } else {
        this.errorSubject.next(response);
        this.swalErrorLogin.fire();
      }
      
    })
  }

}
