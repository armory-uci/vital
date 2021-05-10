import { TestBed } from '@angular/core/testing';
import { IUserInfo } from 'src/app/login/login.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfoService } from './user-info.service';

const collectionStub = {
  valueChanges: jasmine
    .createSpy('snapshotChanges')
    .and.returnValue({ name: 'value' })
};

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

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
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: angularFiresotreStub }]
    });
    service = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the user info', () => {
    service.setUserInfo();
    expect(service.getUserInfo()).toBe(USER_INFO);
  });
});
