import { Component, OnInit } from '@angular/core';

export enum ProblemStatus {
  notStarted = 0,
  correct = 1,
  incorrect = 2
}

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
