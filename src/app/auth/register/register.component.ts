import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { matchingFields } from 'src/app/utils/customValidators';
import { MyErrorStateMatcher } from 'src/app/utils/form-validator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  private errorSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorSubject.asObservable();

  @ViewChild('errorLogin') swalErrorLogin: any;


  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['',[Validators.required]] // el 3 argumento son validaciones asincronas
    }, {
      validators: matchingFields('password', 'password2')
    })
   }

  ngOnInit(): void {
  }

  register() {
    console.log(this.myForm.value);
    const { name, email, password} = this.myForm.value;
    this.authService.register(name, email, password).subscribe( response => {
      if(typeof response == "boolean") {
        this.router.navigate(['dashboard']);
       } else {
        this.errorSubject.next(response);
        this.swalErrorLogin.fire();
      }
    })
  }





}
