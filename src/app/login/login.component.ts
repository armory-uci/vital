import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { IUserInfo } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;
  userInfo: IUserInfo = {
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  login($event) {
    this.userInfo.displayName = $event.displayName;
    this.userInfo.email = $event.email;
    this.userInfo.photoUrl = $event.photoURL;
    this.userInfo.uid = $event.uid;
    this.router.navigate(['home/problem'], { relativeTo: this.route });
  }
}
