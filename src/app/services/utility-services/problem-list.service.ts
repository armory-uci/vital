import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {
  constructor(private firestore: AngularFirestore) {}
  writeProgress() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const uid = userInfo.uid;
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
}
