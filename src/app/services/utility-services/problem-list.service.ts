import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProblem } from 'src/app/home/problem-list/problem.model';
import { IProblemContent } from 'src/app/home/tutorial-page/tutorial-page.model';
import { ProblemStatus } from 'src/app/home/problem-list/problem-table/problem-table.component';

const contentConverter = {
  toFirestore: (data) => data,
  fromFirestore: (snap: QueryDocumentSnapshot<IProblemContent>) => {
    const data = snap.data();

    ['explore', 'exploit', 'mitigate'].forEach((key) => {
      data.content[key] = data.content[key]
        ?.replaceAll('\\n', '\n') // Replace all new line placeholders with actual new lines
        .replaceAll('\\"', '"'); // Double quotes as well
    });
    return data;
  }
};

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

  changeProgress(
    uid: string,
    problemId: string,
    language: string,
    status: ProblemStatus
  ) {
    this.firestore
      .collection('users')
      .doc(uid)
      .collection('progress', (ref) =>
        ref
          .where('language', '==', language)
          .where('problemId', '==', problemId)
      )
      .get()
      .subscribe((statusRef) => {
        statusRef.docs[0].ref.update({ status });
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

  getProblemContent(
    problem: IProblem
  ): Observable<QuerySnapshot<IProblemContent>> {
    const { serverId } = problem;
    return this.firestore
      .collection<IProblemContent>('problem_contents', (ref) =>
        ref.where('server_id', '==', serverId).withConverter(contentConverter)
      )
      .get();
  }
}
