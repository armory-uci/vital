import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  dotCount = 1;

  constructor() {}

  ngOnInit(): void {
    timer(0, 1000)
      .pipe(map((e) => (e + 1) % 4))
      .subscribe((count) => (this.dotCount = count));
  }
}
