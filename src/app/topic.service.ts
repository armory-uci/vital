import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Topic } from 'src/app/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private firestore: AngularFirestore) { }
  getTopics() {
    return this.firestore.collection('topics').snapshotChanges();
  }
}
