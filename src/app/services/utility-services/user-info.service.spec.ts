import { TestBed } from '@angular/core/testing';
import { IUserInfo } from 'src/app/login/login.model';

import { UserInfoService } from './user-info.service';

describe('UserInfoService', () => {
  let service: UserInfoService;
  const USER_INFO: IUserInfo = {
    displayName: 'Test User',
    email: 'test@email.com',
    photoUrl: 'https://someprofilephotos',
    uid: '12jdbfk1233',
    idToken: 'qwertyuiop'
  };

  beforeEach(() => {
    service = new UserInfoService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the user info', async () => {
    const userInfo$ = service.getUserInfo();

    service.setUserInfo(USER_INFO);

    userInfo$.subscribe((info) => expect(info).toBe(USER_INFO));
  });
});
