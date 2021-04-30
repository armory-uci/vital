import { Injectable } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: IUserInfo = {
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null
  };

  setUserInfo(userInformation: IUserInfo) {
    this.userInfo = userInformation;
  }

  getUserInfo() {
    return this.userInfo;
  }
}
