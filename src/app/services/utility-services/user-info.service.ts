import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IUserInfo } from 'src/app/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<IUserInfo>({
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null,
    idToken: null
  });

  setUserInfo(userInformation: IUserInfo) {
    this.userInfo$.next(userInformation);
  }

  getUserInfo() {
    return this.userInfo$;
  }
}
