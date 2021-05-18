import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import { Tile } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userInfo: IUserInfo;
  constructor() {}

  ngOnInit(): void {}

  resetProgress() {}
}
