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
import { first, zipAll } from 'rxjs/operators';

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
  // language = 'python';
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
    problem.serverId = 'sqlInjection'; // FIXME Get this from firebase. Or find a better way.
    this.router.navigate(['/tutorial'], {
      // TODO What all do we need? And does it make sense as a query parameter? Side effect: refreshing the page will have different behaviours in each case
      state: { problem }
    });
  }

  getProblemSet(language?: string) {
    // TODO: add progress for the user if it doesnt exist

    const uid = '1Hml3MbeyNhLwYd0j1G17cHBIZz2';

    this.problemListService.getProblems(language).subscribe((data) => {
      const tableData = data.map((e) => {
        const stat = this.problemListService.getProblemStatus(
          uid,
          e.payload.doc.id,
          language
        );
        return {
          id: e.payload.doc.id,
          status: stat,
          ...(e.payload.doc.data() as Record<string, unknown>)
        };
      });
      this.listdata = new MatTableDataSource(tableData);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator; // TODO: Handle error
    });

    /**
     * @author Kumar Vaibhav
     * @note Keep the promise code for now. I will remove it subsequently.
     * const problemsPromise = this.problemListService
      .getProblems(language)
      .toPromise()
      .then((problemdata) => {
        return problemdata.docs
          .map((d) => {
            return {
              uid,
              problemId: d.id,
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
     **/
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

  clear() {
    this.searchKey = '';
    this.searchTable();
  }

  searchTable() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }
}
