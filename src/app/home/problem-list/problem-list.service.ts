import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Problem } from 'src/app/home/problem-list/problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemListService {
  constructor(private firestore: AngularFirestore) {}
  getProblems() {
    return this.firestore.collection('problems').snapshotChanges();
  }
}
