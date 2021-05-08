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
  constructor(
    private firestore: AngularFirestore,
    private userInfo: UserInfoService
  ) {}
  getProblems(language) {
    return this.firestore
      .collection('problems', (ref) =>
        ref.where('support', 'array-contains', language)
      )
      .snapshotChanges();
  }

  findProblems(language): Observable<any> {
    return this.firestore
      .collection('problems', (ref) =>
        ref.where('support', 'array-contains', language)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const problems = a.payload.doc.data();
            return problems;
          }) as IProblem[];
        })
      );
  }

  // getUserId(language){
  //   console.log("Displa yname is=");
  //   var uid = this.userInfo.getUserInfo().uid;
  //   return this.firestore.collection('users', ref =>ref.where("uid", "==", uid)).snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         var name = a.payload.doc.data();
  //         console.log("Display yname is="+name);
  //         const problems = a.payload.doc.data();
  //         return problems;
  //       })})
  //   )
  //   return this.userInfo.getUserInfo().uid;

  //   // console.log("Getting status id="+idtoken);
  // }
  //   getProblemsList() {

  //     this.findProblems("python").subscribe((r)=> console.log(r));
  //     const mock: IProblem[] =
  //     [
  //       {
  //         id: '1hx234f',
  //         title: 'SQL Injection',
  //         difficulty: 'Medium',
  //         status: 'd'
  //       },
  //       {
  //         id: 'dffdsfds',
  //         title: 'XSS Reflected',
  //         difficulty: 'Medium',
  //         status: 'w'
  //       },
  //       {
  //         id: 'dffdsfds',
  //         title: 'XSS Persistent',
  //         difficulty: 'Medium',
  //         status: 'u'
  //       },
  //       {
  //         id: '01fec67',
  //         title: 'XSS Dom Based',
  //         difficulty: 'Easy',
  //         status: 'd'
  //       }
  //     ];
  //     return mock;
  //   }
}
