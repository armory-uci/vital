import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemListService } from '../../services/utility-services/problem-list.service';
import { IProblem } from './problem.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  disableSelect = new FormControl(false);
  problems: IProblem[];
  listdata: MatTableDataSource<any>;
  language = 'python';
  displayColumns: string[] = ['Id', 'title', 'difficulty', 'status', 'launch'];
  selectedLanguage = 'node';

  constructor(
    private problemListService: ProblemListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.problemListService.getProblems(this.language).subscribe((data) => {
      this.listdata = new MatTableDataSource(
        data.map((e) => {
          return {
            id: e.payload.doc.id,
            status: this.getStatus(this.language),
            ...(e.payload.doc.data() as Record<string, unknown>)
          } as IProblem;
        })
      ); // TODO: Handle error
    });
  }
  getStatus(language): string {
    return 'u';
  }

  onClick(problem: IProblem): void {
    problem.serverId = 'sqlInjection'; // FIXME Get this from firebase. Or find a better way.
    this.router.navigate(['/tutorial'], {
      // TODO What all do we need? And does it make sense as a query parameter? Side effect: refreshing the page will have different behaviours in each case
      state: { problem }
    });
  }

  // getProblemSet(language: string) {
  //   this.problems = this.problemListService.getProblemsList(language);
  //   this.listdata = new MatTableDataSource(this.problems);
  // }

  // changeLanguage(language: string): void {
  //   this.getProblemSet(language);
  // }

  getStatusIcon(element) {
    if (element.status === 'd') {
      return 'check_circle';
    } else if (element.status === 'u') {
      return 'play_circle_filled';
    } else {
      return 'clear';
    }
  }

  getColor(element) {
    if (element.status === 'd') {
      return 'primary';
    } else if (element.status === 'u') {
      return '';
    } else {
      return 'warn';
    }
  }
}
