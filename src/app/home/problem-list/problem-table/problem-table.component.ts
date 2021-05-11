import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemListService } from '../../../services/utility-services/problem-list.service';
import { IProblem } from './../problem.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { UserInfoService } from 'src/app/services/utility-services/user-info.service';
import { IUserInfo } from 'src/app/login/login.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export enum ProblemStatus {
  notStarted = '0',
  correct = '1',
  incorrect = '2'
}

@Component({
  selector: 'app-problem-table',
  templateUrl: './problem-table.component.html',
  styleUrls: ['./problem-table.component.scss']
})
export class ProblemTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  disableSelect = new FormControl(false);
  problems: IProblem[];
  listdata: MatTableDataSource<any>;
  displayColumns: string[] = ['title', 'difficulty', 'status', 'launch'];
  selectedLanguage = 'node';
  searchKey = '';

  constructor(
    private problemListService: ProblemListService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.getProblemSet(this.selectedLanguage);
  }

  onClick(problem: IProblem): void {
    this.router.navigate(['/tutorial'], {
      state: { problem }
    });
  }

  getProblemSet(language?: string) {
    const currentUserInfo: IUserInfo = this.userInfoService.getUserInfo();
    const uid = currentUserInfo.uid;

    const problemsPromise = this.problemListService
      .getProblems(language)
      .toPromise()
      .then((problemdata) => {
        return problemdata.docs
          .map((d) => {
            const serverId = d.get('ids')[language].server_id;
            return {
              uid,
              problemId: d.id,
              serverId,
              ...(d.data() as Record<string, unknown>)
            };
          })
          .map((d) => {
            return this.problemListService
              .getProblemStatus(uid, d.problemId, language)
              .toPromise()
              .then((da) => {
                return {
                  ...d,
                  status: da.docs[0].get('status')
                };
              });
          });
      });

    problemsPromise.then(Promise.all).then((problemdata) => {
      this.listdata = new MatTableDataSource(problemdata);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator; // TODO: Handle error
    });
  }

  changeLanguage(language: string): void {
    this.getProblemSet(language);
  }

  getStatusIcon(element) {
    if (element.status === ProblemStatus.correct) {
      return 'check_circle';
    } else if (element.status === ProblemStatus.notStarted) {
      return 'fiber_new';
    } else if (element.status === ProblemStatus.incorrect) {
      return 'play_circle_filled';
    } else {
      return 'warning';
    }
  }

  getColor(element) {
    if (element.status === ProblemStatus.correct) {
      return 'primary';
    } else if (element.status === ProblemStatus.incorrect) {
      return '';
    } else {
      return 'warn';
    }
  }

  clear() {
    this.searchKey = '';
    this.searchTable();
  }

  searchTable() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }
}
