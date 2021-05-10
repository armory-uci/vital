import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private userInfoService: UserInfoService,
    private problemListService: ProblemListService
  ) {}

  ngOnInit(): void {}

  login() {
    this.userInfoService.setUserInfo();
    const uid = this.userInfoService.getUserInfo().uid;
    this.problemListService.writeProgress().subscribe((actions) => {
      return actions.map((a) => {
        this.problemListService
          .getProblemStatus(uid, a.payload.doc.id, 'python')
          .subscribe((data) => {
            if (data.docs.length === 0) {
              this.problemListService.addProgress(
                uid,
                a.payload.doc.id,
                'python'
              );
            }
          });
        this.problemListService
          .getProblemStatus(uid, a.payload.doc.id, 'node')
          .subscribe((data) => {
            if (data.docs.length === 0) {
              this.problemListService.addProgress(
                uid,
                a.payload.doc.id,
                'node'
              );
            }
            this.router.navigate(['/problem']);
          });
      });
    });
  }
}
