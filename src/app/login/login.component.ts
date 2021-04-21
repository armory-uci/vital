import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;
  username = "";
  password = "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  goToTutorial() {
    this.router.navigate(['home/tutorial'], { relativeTo: this.route });
  }

  goToReference() {
    this.router.navigate(['reference'], { relativeTo: this.route });
  }

  goToProblem() {
    this.router.navigate(['home/problem'], { relativeTo: this.route });
  }

  onButtonClick($event) {
    console.log($event);
    this.router.navigate(['home/problem'], { relativeTo: this.route });
  }
}
