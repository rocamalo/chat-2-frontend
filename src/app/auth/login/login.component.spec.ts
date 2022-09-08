import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthServiceSpy: any;
  let mockAuthService: any;
  let mockRouter = {navigate: jasmine.createSpy('navigate')};
  let testUserData = {
    ok: true,
        uid: '123',
        name: 'Roberto',
        token: '123token',
        role: 'user',
        email: 'test@email.com'
  }


  function updateForm(email: string, password: string) {
    fixture.componentInstance.myForm.controls['email'].setValue(email);
    fixture.componentInstance.myForm.controls['password'].setValue(password);
  }

  beforeEach(async () => {
    mockAuthServiceSpy = jasmine.createSpyObj([
      'login',
      'register',
      'logout',
      'setUserDataToLocalStorage',
      'setPropertyToLocalStorage',
      'validarToken',
    ]);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthServiceSpy },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // mockAuthService = mockAuthServiceSpy.login.and.returnValue(
    //   Promise.resolve({
    //     ok: true,
    //     uid: '123',
    //     name: 'Roberto',
    //     token: '123token',
    //     role: 'user',
    //     email: 'test@email.com',
    //   })
    // );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('authService method login() should have been called from button click ', fakeAsync(() => {
    updateForm('roberto@gmail.com', '123456');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(mockAuthServiceSpy.login).toHaveBeenCalled();
  }));


  it('should route to home if login successfully', fakeAsync(() => {
    updateForm('roberto@gmail.com', '123456'); //FIRST WE FILL ALL FORM FIELDS WITH VALID VALUES
    fixture.detectChanges();
    mockAuthService = mockAuthServiceSpy.login.and.returnValue(of(true));  //THEN WE PREPARE OUR SERVICE RESPNSE TO TRUE
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();//THEN WE CLICK BUTTON TO FIRE LOGIN METHOD ()
    advance(fixture);
    expect (mockRouter.navigate).toHaveBeenCalledWith(['dashboard']);

    
    //const navArgs = mockRouter.navigateByUrl.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    //expect(navArgs).toBe('/dashboard', 'should nav to Home Page');
  }));
  
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }

});
