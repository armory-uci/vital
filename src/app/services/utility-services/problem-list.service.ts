import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInfoService } from '../../services/utility-services/user-info.service';
import { map } from 'rxjs/operators';
import { IProblem } from 'src/app/home/problem-list/problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {
  constructor(private firestore: AngularFirestore) {}
  getProblems(language) {
    return this.firestore
      .collection('problems', (ref) =>
        ref.where('support', 'array-contains', language)
      )
      .snapshotChanges();
  }

  getProblemsList(language: string) {
    let mock: IProblem[];
    if (language === 'node') {
      mock = [
        {
          id: '1hx234f',
          title: 'SQL Injection',
          difficulty: 'Medium',
          status: 'd'
        },
        {
          id: 'dffdsfds',
          title: 'XSS Reflected',
          difficulty: 'Medium',
          status: 'w'
        },
        {
          id: 'dffdsfds',
          title: 'XSS Persistent',
          difficulty: 'Medium',
          status: 'u'
        },
        {
          id: '01fec67',
          title: 'XSS Dom Based',
          difficulty: 'Easy',
          status: 'd'
        }
      ];
    } else {
      mock = [
        {
          id: '234f1hx',
          title: 'SQL Injection',
          difficulty: 'Medium',
          status: 'd'
        },
        {
          id: '431tyu',
          title: 'CORS',
          difficulty: 'Medium',
          status: 'w'
        }
      ];
    }
    return mock;
  }
}
