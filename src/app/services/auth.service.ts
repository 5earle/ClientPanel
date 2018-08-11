import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {promise} from 'selenium-webdriver';

@Injectable()
export class AuthService {
  // login users
  constructor(public af: AngularFireAuth) { }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.af.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
  // check user status return oberavable
  getAuth() {
    return this.af.authState.map(auth => auth);
  }
  loggedOut() {
    this.af.auth.signOut();
  }
  register(email: string, password: string) {
    return new Promise((resolved, reject) => {
      this.af.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolved(userData),
          err => reject(err));
    });
  }

}
