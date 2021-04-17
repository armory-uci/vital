import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
}
