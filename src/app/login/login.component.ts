import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { ProblemListService } from '../services/utility-services/problem-list.service';
import { UserInfoService } from '../services/utility-services/user-info.service';

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

  login($event) {
    this.userInfoService.setUserInfo();
    this.problemListService.writeProgress(userInfo.uid);
    this.router.navigate(['/problem']);
  }
}
