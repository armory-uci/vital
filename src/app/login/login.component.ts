import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { UserInfoService } from '../services/utility-services/user-info.service';
import { IUserInfo } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {}

  async login($event) {
    const idToken = await $event.getIdToken();
    const userInfo: IUserInfo = {
      displayName: $event.displayName,
      email: $event.email,
      photoUrl: $event.photoURL,
      uid: $event.uid,
      idToken
    };
    this.userInfoService.setUserInfo(userInfo);
    this.router.navigate(['home/problem'], { relativeTo: this.route });
  }
}
