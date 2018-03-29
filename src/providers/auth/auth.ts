import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  signUp(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  
  signIn(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}
