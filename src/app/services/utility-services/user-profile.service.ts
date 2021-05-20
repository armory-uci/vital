import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private firestore: AngularFirestore) {}

  getUserProfile(userId: string) {
    return this.firestore
      .collection('users/' + userId + '/progress')
      .snapshotChanges();
  }
}
