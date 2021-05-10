import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/utility-services/user-info.service';
import { map } from 'rxjs/operators';
import { IProblem } from 'src/app/home/problem-list/problem.model';
import { ProblemStatus } from 'src/app/home/problem-list/problem-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {
  constructor(private firestore: AngularFirestore) {}
  writeProgress() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const user = userInfo.uid;
    this.firestore
      .collection('problems')
      .snapshotChanges()
      .subscribe((actions) => {
        return actions.map((a) => {
          this.getProblemStatus(uid, a.payload.doc.id, 'python').subscribe(
            (data) => {
              if (data.docs.length === 0) {
                this.firestore.collection('users/' + uid + '/progress').add({
                  language: 'python',
                  status: '0',
                  problemId: a.payload.doc.id
                });
              }
            }
          );
          this.getProblemStatus(uid, a.payload.doc.id, 'node').subscribe(
            (data) => {
              if (data.docs.length === 0) {
                this.firestore.collection('users/' + uid + '/progress').add({
                  language: 'node',
                  status: '0',
                  problemId: a.payload.doc.id
                });
              }
            }
          );
        });
      });
  }

  setProblemsdata(pid: string) {
    return this.firestore.collection('problems').doc(pid).valueChanges();
  }

  getProblems(language) {
    return this.firestore
      .collection('problems', (ref) =>
        ref.where('support', 'array-contains', language)
      )
      .get();
  }
  getProblemStatus(uid, problemId, language) {
    return this.firestore
      .collection('users')
      .doc(uid)
      .collection('progress', (ref) =>
        ref
          .where('language', '==', language)
          .where('problemId', '==', problemId)
      )
      .get();
  }

  getProblemsList(language: string) {
    let mock: IProblem[];
    if (language === 'node') {
      mock = [
        {
          id: '1hx234f',
          title: 'SQL Injection',
          difficulty: 'Medium',
          status: ProblemStatus.correct
        },
        {
          id: 'dffdsfds',
          title: 'XSS Reflected',
          difficulty: 'Medium',
          status: ProblemStatus.incorrect
        },
        {
          id: 'dffdsfds',
          title: 'XSS Persistent',
          difficulty: 'Medium',
          status: ProblemStatus.correct
        },
        {
          id: '01fec67',
          title: 'XSS Dom Based',
          difficulty: 'Easy',
          status: ProblemStatus.correct
        }
      ];
    } else {
      mock = [
        {
          id: '234f1hx',
          title: 'SQL Injection',
          difficulty: 'Medium',
          status: ProblemStatus.correct
        },
        {
          id: '431tyu',
          title: 'CORS',
          difficulty: 'Medium',
          status: ProblemStatus.incorrect
        }
      ];
    }
    return mock;
  }
}
