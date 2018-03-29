import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../models/user.model';

@Injectable()
export class UserProvider {


  private userRef = this.db.object<User>(`users/${this.getUserID()}`);

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getUserID() {
    return this.afAuth.auth.currentUser.uid;
  }

  getUserEmail() {
    return this.afAuth.auth.currentUser.email;
  }

  addUser(user: User) {
    return this.userRef.update(user);
  }

}
