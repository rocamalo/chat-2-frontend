import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  userName!: string;
  userRole!: string;
  mobileQuery!: MediaQueryList;
  showMenu: boolean = false;

  public innerWidth: any; //for showing or nort the complete name on profile



  //PROPERTIES TO SHOW BUTTONS AT BOTTOM OF SIDENAV
  events: string[] = [];
  opened!: boolean;
  appropriateClass:string = '';
  @HostListener('window:resize', ['$event'])
  getScreenHeight(event?: any){
    //console.log(window.innerHeight);
    if(window.innerHeight<=412){
      this.appropriateClass = 'bottomRelative';
    }else{
      this.appropriateClass = 'bottomStick';
    }
  }
  @HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.innerWidth = window.innerWidth;
}


  private _mobileQueryListener!: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getScreenHeight();
   }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')!;
    this.userRole = localStorage.getItem('userRole')!;
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigateByUrl('/dashboard/profile');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
 }

}
