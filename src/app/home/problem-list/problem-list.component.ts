import { Component, OnInit } from '@angular/core';
import { ProblemListService } from './problem-list.service';
import { Problem } from './problem.model';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  constructor(private problemListService: ProblemListService) {}

  ngOnInit() {
    this.problemListService.getProblems().subscribe((data) => {
      this.problems = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Record<string, unknown>)
        } as Problem;
      });
    });
  }
}
