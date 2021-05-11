import { Injectable } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import '@firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProblemListService } from './problem-list.service';

const supportedLanguages: string[] = ['node', 'python'];

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
    public afAuth: AngularFireAuth,
    private problemListService: ProblemListService,
    private router: Router
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
        this.updateProgress(this.userInfo.uid);
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

  updateProgress(uid) {
    this.problemListService.writeProgress().subscribe((actions) => {
      return actions.map((a) => {
        supportedLanguages.forEach((l) => {
          this.problemListService
            .getProblemStatus(uid, a.payload.doc.id, l)
            .subscribe((data) => {
              if (data.docs.length === 0) {
                this.problemListService.addProgress(uid, a.payload.doc.id, l);
              }
            });
        });
        this.router.navigate(['/problem']);
      });
    });
  }
}
