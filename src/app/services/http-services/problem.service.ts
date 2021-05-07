import { Injectable } from '@angular/core';
import { IProblem } from 'src/app/home/problem-list/problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  constructor() {}

  getProblemsList() {
    const mock: IProblem[] = [
      {
        id: 'dffdsfds',
        title: 'SQL Injection',
        difficulty: 'Medium',
        status: 'u'
      },
      {
        id: 'dffdsfds',
        title: 'XSS Reflected',
        difficulty: 'Medium',
        status: 'u'
      },
      {
        id: 'dffdsfds',
        title: 'XSS Persistent',
        difficulty: 'Medium',
        status: 'u'
      }
    ];
    return mock;
  }
}
