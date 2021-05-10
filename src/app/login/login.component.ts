import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { ProblemListService } from '../services/utility-services/problem-list.service';
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
    private userInfoService: UserInfoService,
    private problemListService: ProblemListService
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
    this.problemListService.writeProgress(
      this.userInfoService.getUserInfo().uid
    );
    this.router.navigate(['/problem']);
  }
}
