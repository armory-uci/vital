import { Component, OnInit } from '@angular/core';
import { ProblemListService } from '../../services/utility-services/problem-list.service';
import { IProblem } from './problem.model';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  problems: IProblem[];
  constructor(private problemListService: ProblemListService) {}

  ngOnInit() {
    this.problemListService.getProblems().subscribe((data) => {
      this.problems = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Record<string, unknown>)
        } as IProblem;
      }); // TODO: Handle error
    });
  }
}
