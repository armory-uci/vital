import { Component, OnInit } from '@angular/core';
import { ProblemListService } from '../../services/utility-services/problem-list.service';
import { IProblem } from './problem.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  problems: IProblem[];
  constructor(
    private problemListService: ProblemListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  onClick(): void {
    this.router.navigate(['home/tutorial'], {
      // TODO What all do we need? And does it make sense as a query parameter? Side effect: refreshing the page will have different behaviours in each case
      state: { problem: 'sqlInjection' }
    });
  }
}
