import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/User.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  titleCard: string = 'My Profile';
  widthPercentage: number = 40;
  userName!: string;
  userEmail!: string;
  userRole!: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')!;
    this.userEmail = localStorage.getItem('userEmail')!;
    this.userRole = localStorage.getItem('userRole')!;
  }

}
