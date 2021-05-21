import { Component, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import { UserInfoService } from 'src/app/services/utility-services/user-info.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  userInfo: IUserInfo;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit() {
    this.userInfo = this.userInfoService.getUserInfo();
  }
}
