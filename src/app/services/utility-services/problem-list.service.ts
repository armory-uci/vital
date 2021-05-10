import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {
  constructor(private firestore: AngularFirestore) {}
  addProgress(uid, problemId, lang) {
    this.firestore.collection('users/' + uid + '/progress').add({
      language: lang,
      status: '0',
      problemId
    });
  }
  writeProgress() {
    return this.firestore.collection('problems').snapshotChanges();
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
