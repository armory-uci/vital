import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemListService } from '../../../services/utility-services/problem-list.service';
import { IProblem } from './../problem.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { UserInfoService } from 'src/app/services/utility-services/user-info.service';
import { IUserInfo } from 'src/app/login/login.model';

export enum ProblemStatus {
  notStarted = 0,
  correct = 1,
  incorrect = 2
}

@Component({
  selector: 'app-problem-table',
  templateUrl: './problem-table.component.html',
  styleUrls: ['./problem-table.component.scss']
})
export class ProblemTableComponent implements OnInit {
  disableSelect = new FormControl(false);
  problems: IProblem[];
  listdata: MatTableDataSource<any>;
  language = 'python';
  displayColumns: string[] = ['Id', 'title', 'difficulty', 'status', 'launch'];
  selectedLanguage = 'node';

  constructor(
    private problemListService: ProblemListService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.getProblemSet(this.language);
  }

  getStatus(language): number {
    // get status for a user
    const userDetails: IUserInfo = this.userInfoService.getUserInfo();
    return ProblemStatus.notStarted;
  }

  onClick(problem: IProblem): void {
    problem.serverId = 'sqlInjection'; // FIXME Get this from firebase. Or find a better way.
    this.router.navigate(['/tutorial'], {
      // TODO What all do we need? And does it make sense as a query parameter? Side effect: refreshing the page will have different behaviours in each case
      state: { problem }
    });
  }

  getProblemSet(language?: string) {
    this.problemListService.getProblems(language).subscribe((data) => {
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

  changeLanguage(language: string): void {
    this.getProblemSet(language);
  }

  getStatusIcon(element) {
    if (element.status === ProblemStatus.correct) {
      return 'check_circle';
    } else if (element.status === ProblemStatus.notStarted) {
      return 'play_circle_filled';
    } else if (element.status === ProblemStatus.incorrect) {
      return 'clear';
    } else {
      return 'warning';
    }
  }

  getColor(element) {
    if (element.status === ProblemStatus.correct) {
      return 'primary';
    } else if (element.status === ProblemStatus.incorrect) {
      return 'warn';
    } else {
      return '';
    }
  }
}
