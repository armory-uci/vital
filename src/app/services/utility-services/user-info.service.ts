import { Injectable } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import User from 'firebase/app';
import userInfo from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: IUserInfo = {
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null,
    idToken: null
  };

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth
  ) {}

  setUserInfo(): void {
    this.afAuth.authState.subscribe(async (user) => {
      const idToken = await user.getIdToken();
      if (user) {
        this.userInfo.displayName = user.displayName;
        this.userInfo.email = user.email;
        this.userInfo.idToken = idToken;
        this.userInfo.photoUrl = user.photoURL;
        this.userInfo.uid = user.uid;
        localStorage.setItem('user', JSON.stringify(this.userInfo));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getUserInfo(): IUserInfo {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    return this.userInfo;
  }
}
